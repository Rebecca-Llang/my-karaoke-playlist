# My Karaoke Playlist 🎤

A modern full‑stack web app to manage your karaoke playlist. Add songs, filter by decade/genre, update genres, and remove songs. Clean, responsive UI with a focus on simplicity.

## Features ✨
- Add songs with title, artist, genre, and decade
- View playlist in a responsive grid
- Filter by decade and genre (client-side)
- Update a song's genre inline
- Delete songs

## Tech Stack 🛠️
- Frontend: React 18, TypeScript, React Router, React Query, Vite
- Styling: CSS with a small set of custom properties and Google Fonts (Poppins, Inter, Fredoka)
- Backend: Node.js, Express
- Database: SQLite3 with Knex.js
- Testing: Vitest, Testing Library

## Setup ✅

```bash
git clone https://github.com/rebecca-llang/my-karaoke-playlist
cd my-karaoke-playlist
npm install
npm run dev
```

## Project Structure 📁

```
my-karaoke-playlist/
├── client/
│   ├── components/        # UI components (AddSong, Songs, Song, etc.)
│   ├── apis/              # API client (songsAPI)
│   └── styles/            # Global CSS
├── server/
│   ├── routes/            # Express routes (songs)
│   └── db/                # Knex config, migrations, seeds
└── models/                # TypeScript interfaces (Song, NewSong)
```

## Notes & Future Work 🗒️
- Improve test coverage
- Deployment: Docker/Vercel/Render not configured yet
