require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { ethers } = require('ethers');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// --- Vercel Config: Use Memory Storage ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Setup Gemini & Wallet
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const backendWallet = new ethers.Wallet(process.env.BACKEND_PRIVATE_KEY);

app.post('/verify-planting', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "No image uploaded" });
        
        const userAddress = req.body.address;
        if (!userAddress) return res.status(400).json({ success: false, message: "No wallet address provided" });

        // Ask Gemini to verify
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Analyze this image. Is it a real photo of a newly planted tree, sapling, or gardening activity? If yes, answer strictly with 'YES'. If it is fake, a drawing, or irrelevant, answer 'NO'.";
        
        // Convert buffer for Gemini
        const imagePart = {
            inlineData: {
                data: req.file.buffer.toString("base64"),
                mimeType: req.file.mimetype
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const responseText = result.response.text().trim().toUpperCase();

        console.log(`User: ${userAddress} | Result: ${responseText}`);

        if (responseText.includes("YES")) {
            // Sign the reward (User + 0.01 ETH)
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
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// --- Export for Vercel ---
module.exports = app;
