require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { ethers } = require('ethers');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// --- Vercel Config ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Setup Gemini (Use the API Key from Environment Variables)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const backendWallet = new ethers.Wallet(process.env.BACKEND_PRIVATE_KEY);

// Serve Frontend
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Verify Route
app.post('/verify-planting', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });
        if (!req.body.address) return res.status(400).json({ success: false, message: "No wallet address" });

        const userAddress = req.body.address;

        // --- FIXED: Use gemini-1.5-flash (Works with new library version) ---
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        
        const prompt = "Analyze this image. Is it a real photo of a newly planted tree, sapling, or gardening activity? If yes, answer strictly with 'YES'. If it is fake, a drawing, or irrelevant, answer 'NO'.";
        
        const imagePart = {
            inlineData: {
                data: req.file.buffer.toString("base64"),
                mimeType: req.file.mimetype
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text().trim().toUpperCase();

        if (responseText.includes("YES")) {
            const amount = ethers.parseEther("0.01"); 
            const messageHash = ethers.solidityPackedKeccak256(
                ["address", "uint256"], 
                [userAddress, amount]
            );
            const signature = await backendWallet.signMessage(ethers.getBytes(messageHash));

            return res.json({ 
                success: true, 
                message: "Tree Verified! Reward Approved.",
                signature: signature
            });
        } else {
            return res.json({ 
                success: false, 
                message: "Verification Failed: Gemini did not see a valid tree." 
            });
        }

    } catch (error) {
        console.error("Error:", error);
        // Return actual error message for debugging
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = app;
