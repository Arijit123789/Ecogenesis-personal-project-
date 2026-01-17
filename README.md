# 🌱 EcoGenesis

**DePIN for Nature | The Global Rebirth**

EcoGenesis is a Decentralized Physical Infrastructure Network (DePIN) designed to incentivize global reforestation. It bridges the gap between physical environmental action and digital value by using **Google Gemini AI** to verify tree planting and the **Ethereum Blockchain** (Sepolia) to distribute rewards.

![Project Banner](https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)

## 🚀 Key Features

* **🤖 AI-Powered Verification:** Integrates `gemini-2.5-flash` to analyze uploaded photos and verify if they contain a real, newly planted tree.
* **⛓️ Blockchain Rewards:** Users connect their MetaMask wallet. Upon AI verification, the backend signs a secure transaction allowing the user to claim **0.01 ETH** on the Sepolia testnet.
* **🌍 3D Live Tracker:** Features an interactive 3D globe (built with `globe.gl`) visualizing reforestation efforts in real-time.
* **🎨 Modern UI/UX:** A "Glassmorphism" aesthetic built with **Tailwind CSS**, featuring **GSAP** animations and smooth scrolling (`lenis`).

## 🛠️ Tech Stack

**Frontend:**
* HTML5, Tailwind CSS
* Ethers.js (Web3 interaction)
* GSAP (Animations)
* Three.js / Globe.gl (3D Visualization)

**Backend:**
* Node.js & Express.js
* Google Generative AI SDK (Gemini)
* Multer (Image processing)

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/ecogenesis.git](https://github.com/yourusername/ecogenesis.git)
    cd ecogenesis
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your keys:
    ```env
    GEMINI_API_KEY=your_google_gemini_api_key
    BACKEND_PRIVATE_KEY=your_wallet_private_key_for_signing
    ```

4.  **Run the Server**
    ```bash
    npm start
    ```
    The app will run at `http://localhost:3000` (or your configured port).

## 📖 How It Works

1.  **Connect Wallet:** Users connect their MetaMask wallet on the homepage.
2.  **Plant & Upload:** Users plant a tree, take a photo, and upload it via the "Submit Proof of Work" section.
3.  **AI Analysis:** The backend sends the image to Gemini AI with the prompt: *"Is it a real photo of a newly planted tree...?"*
4.  **Get Rewarded:** If verified (YES), the smart contract issues a reward signature, minting 0.01 ETH to the user's wallet.

## 🔮 Future Roadmap
* Migration to Ethereum Mainnet or L2 (Polygon/Arbitrum).
* NFT minting for every verified tree (Soulbound Tokens).
* Leaderboard for top "Eco-Heroes."

## 👨‍💻 Author

**Arijit Bhaya**
* [LinkedIn](https://www.linkedin.com/in/arijitbhaya)
* [GitHub](https://github.com/Arijit123789)

---
*Built for a greener future.* 🌍
