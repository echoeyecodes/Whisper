# Whisper AI – Sales Call Feedback Tool

Whisper AI is a web-based tool that allows you to upload audio from sales calls and receive feedback on performance, suggested improvements, and more. It is divided into two main components:

- **Frontend** – Built with Next.js for the user interface and dashboard
- **Backend** – An API server that handles audio processing and analysis using OpenAI models

---

## 🔧 Tech Stack

### Frontend

- Next.js
- Tailwind CSS
- Zod + React Hook Form (for form validation)
- React Query (for caching and state management)

### Backend

- Bun (for package management and dev server)
- Express.js
- PostgreSQL (via Sequelize ORM)
- OpenAI Whisper (`whisper-1`) for transcription
- GPT-4o-mini for transcription analysis

---

## 🚀 Setup Instructions

### 1. Frontend (Website)

#### Location: `/website`

1. Navigate to the `website` folder:

   ```bash
   cd website
   npm install
   ```

2. Copy the sample environment file and fill in required variables:

   ```bash
   cp .env.sample .env.local
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to [http://localhost:3000](http://localhost:3000)

You should now see the dashboard interface.

---

### 2. Backend (API Server)

#### Location: `/server`

1. Navigate to the `server` folder:

   ```bash
   cd server
   bun install
   ```

2. Copy the sample environment file and fill in required variables:

   ```bash
   cp .env.sample .env
   ```

3. Make sure PostgreSQL is installed and running.

   - Update the values for `DB_HOST`, `DB_PORT`, `DB_PASSWORD`, and `DB_NAME` in the `.env` file with your local credentials.

4. Run the development server:

   ```bash
   bun run dev
   ```

   The server will start on the port specified in your `.env` file.

5. Once the API is running, proceed to set up the dashboard using the frontend instructions above.

## 📝 Notes

- You must have Bun installed for the backend. [Install Bun here](https://bun.com/docs/installation)
- The frontend interacts with the backend to upload audio files, retrieve transcriptions, and display feedback.
- Ensure your environment variables are correctly set for seamless communication between the frontend and backend.

## 🚀 What I'd Build Next with More Time

Given more time, I would implement the following:

### 1. **Query State Management in URL**

Save filter states, selected reports, and pagination in the URL
Save the currently viewed report in state during soft navigation and use that to populate the report detail page

### 2. **Authentication System**

- User registration and login functionality
- Session management

### 3. **S3 Integration with Signed URLs**

- Move file storage from local filesystem to AWS S3
- Implement signed URLs for secure file access

### 4. **Background Workers & Notifications**

Send email/SMS notifications when analysis is complete

## Time Spent

I spent approximately **3 hours** on this project, focusing on:

- Setting up the full-stack architecture
- Implementing the core upload and analysis functionality
- Building the UI with filtering

---

## AI Tools Used

- **ChatGPT** - whisper and o3-mini
- **Cursor** - Autocomplete, also helped to fine-tune ui styles
