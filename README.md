Memory Match Game

A fun and responsive card matching game built with React, TypeScript, TailwindCSS, and Framer Motion. Flip cards, find pairs, and challenge yourself across multiple difficulty levels while tracking your score, time, and moves.

🚀 Setup & Installation

Clone the repository

git clone https://github.com/rakshitbisht7/memory-game.git
cd card-memory-game


Install dependencies

npm install


Run the development server

npm run dev


Open http://localhost:5173
 (or as shown in your terminal) in your browser.

Build for production

npm run build

🎮 Controls & Gameplay

Flip a card → click/tap on it.

Find matching pairs → two identical cards stay revealed.

Win condition → match all pairs on the board.

Pause/Resume → pauses timer and disables interaction.

Restart → resets the board, timer, moves, and score.

Difficulty Levels

Easy: 4×4 grid (8 pairs)

Medium: 6×6 grid (18 pairs)

✨ Features

🔹 Dynamic grid sizes (Easy 4×4, Medium/Hard 6×6)

🔹 Framer Motion animations → smooth card flips, hover effects, and win celebrations

🔹 Game tracking → moves counter, timer, and live score calculation

🔹 localStorage integration → best scores per difficulty are saved persistently

🔹 Pause/Resume functionality

🔹 Win modal with celebration animations & score breakdown

🔹 Dark theme with purple/pink gradient highlights

🔹 Responsive design → optimized for desktop & mobile

🔹 Emoji-based card symbols for variety and fun

🛠️ Technical Stack

⚛️ React + TypeScript

🎨 Tailwind CSS with custom design tokens

🎞️ Framer Motion for smooth animations

💾 localStorage for persistent high scores

🧩 Custom hooks for game logic separation

🐞 Known Issues / Future Improvements

🔸 Currently only supports two grid sizes (4×4, 6×6). More could be added.

🔸 No sound effects yet — could add flip/match/win sounds for extra feedback.

🔸 Leaderboard is a stub (mock JSON). Could be expanded into a real backend with player profiles.

🔸 Some older mobile browsers may have slight animation stutters.

📸 Demo

<img width="2791" height="1569" alt="Screenshot 2025-08-30 192934" src="https://github.com/user-attachments/assets/3367bae4-89fb-409f-bb1e-b39e87c9af03" />
