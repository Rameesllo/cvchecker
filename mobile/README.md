# Resume Checker Mobile

A small Expo + React Native app styled with NativeWind. It lets you select a PDF,
DOCX, PNG, or JPG resume, upload it to the existing API, and view the returned
scores and feedback on one screen.

## Run

1. Install Node.js and dependencies with `npm install`.
2. Start the API server from the `server` directory.
3. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL`:
   - Android emulator: `http://10.0.2.2:5000/api`
   - iOS simulator: `http://localhost:5000/api`
   - Physical phone: use your computer's LAN IP, such as `http://192.168.1.10:5000/api`.
4. Run `npm start` and open the project in Expo Go or a simulator.

The API server needs its existing Cloudinary and OpenAI environment variables.
