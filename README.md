# Streamer Submission App

This repository contains a web application for submitting and viewing streamer profiles. The application allows users to submit information about their favorite streamers and view a list of all submitted streamers along with their upvote/downvote counts. The application is built using **React.js** for the frontend, **Node.js** with **Nest.js** for the backend, and a lightweight database for data storage.

## Features

### Frontend

#### Page 1: Streamer Submission Form
- Users can submit details about streamers including their name, streaming platform (Twitch/YouTube/TikTok/Kick/Rumble), avatar, and a brief description.
- Submitted data is sent to the backend API for storage.

#### Page 1: Streamer List
- Displays a list of all submitted streamers along with their upvote and downvote counts.
- The list is updated in real-time as new streamers are added and upvotes/downvotes are cast.

#### Page 2: Streamer Details
- Shows detailed information about a specific streamer including their name, description, platform, and a avatar.

### Backend

- Provides a set of API endpoints for handling streamer data.
- **POST /streamers**: Accepts new streamer submissions from the frontend and stores them in the database.
- **GET /streamers**: Returns all the stored streamer submissions in response to a request from the frontend.
- **GET /streamer/[streamerId]**: Returns data about a specific streamer based on the provided streamerId.
- **PUT /streamers/[streamerId]/vote**: Receives an upvote for a specific streamer and updates their current upvote/downvote count.
- Utilizes WebSocket connection for real-time updates on streamer submissions and upvote/downvote counts.

## Technologies Used

- **React.js**: A popular JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime used for server-side development.
- **Nest.js**: Web application frameworks for building APIs with Node.js.
- **TypeScript**: A typed superset of JavaScript used for enhanced developer productivity and code reliability.
- **SQlite**: A lightweight database for storing streamer submissions.
- **Prisma**: An ORM library for simplifying database interaction.
- **WebSocket**: A technology for enabling real-time communication between the frontend and backend.


## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install` (for both frontend and backend)
3. Set up the database on backend: `npx prisma migrate dev --name init`
5. Start the frontend development server: `npm start`
6. Start the backend server: `npm run start`
7. Access the application in your browser at `http://localhost:3000`

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request or open an issue in the repository.

## License

This project is licensed under the [MIT License](LICENSE).
