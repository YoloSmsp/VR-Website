# Vision Pro & AI VR Interactive Showcase

An ultra-modern, high-performance spatial computing and AI VR landing page with dual sticky canvas scroll animations, dynamic 3D model selection, frosted glass feature cards, and modular subscription pricing.

## 🚀 Features

- **Dual Interactive Scroll Animations**: 240-frame high-resolution image sequences synchronized smoothly with window scrolling via HTML5 Canvas.
- **Dynamic 3D VR Headset Viewer**: Interactive selector allowing real-time switching between headset models (*Apex Cyber*, *Mirage Glass*, and *Horizon Pulse*).
- **Mirrored Frosted Glass Feature Cards**: Symmetrically positioned glassmorphic spec cards with ambient backdrop blur.
- **Functional Scope & Milestones**: Responsive 7-column pill grid showcasing roadmap milestones.
- **Modular Hardware & Subscription Tiers**: High-fidelity dark mode pricing cards for Basic, Standard, and Pro tiers with popular choice badge and feature checklists.

## 🛠️ Tech Stack

- **HTML5 & Vanilla JavaScript**
- **Tailwind CSS** (via CDN)
- **HTML5 Canvas 2D Context** for zero-latency frame scrubbing
- **Inter Font & Google Fonts Typography**

## 📁 Clean Project Structure

```text
├── index.html                  # Main Webpage Entry Point
├── assets/
│   ├── js/
│   │   └── main.js             # Dual Canvas scroll & interactive engine
│   ├── images/
│   │   └── models/             # VR Headset model showcase assets
│   └── frames/
│       ├── hero/               # 240-frame sequence for first scroll animation
│       └── vr-box/             # 240-frame sequence for second scroll animation
├── .gitignore                  # Ignored system files
└── README.md                   # Project documentation
```

## 💻 Getting Started

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YoloSmsp/VR-Website.git
   cd VR-Website
   ```
2. Launch a local web server (e.g. using Python or VS Code Live Server):
   ```bash
   python -m http.server 8080
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```
