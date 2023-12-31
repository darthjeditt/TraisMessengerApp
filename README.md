# Trai's Messenger App

## Introduction

Trai's Messenger App is a modern, real-time chat application designed to provide seamless communication experiences. Built with the latest technologies, it offers a user-friendly interface, robust features, and high performance.

![](https://github.com/darthjeditt/chatApp/blob/main/gifs/gif1.gif)

## Features

- **Real-Time Messaging**: Enjoy live conversations with minimal latency.
- **User Authentication**: Secure sign-up and login functionalities.
- **Message History**: Access your past conversations anytime.

![](https://github.com/darthjeditt/chatApp/blob/main/gifs/gif2.gif)

## Technology Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Testing**: Jest

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/darthjeditt/chatApp.git
   ```

2. **Install dependencies**:
   - For backend: 
     ```bash
     cd chatapp-backend && npm install
     ```
   - For frontend: 
     ```bash
     cd chatapp-frontend && npm install
     ```

3. **Generate JWT Secret**:
   - Run `node chatapp-backend/genSecret.js` to generate a JWT secret code.
   - Create a `.env` file in the `chatapp` directory.
   - Add the generated JWT secret code to the `.env` file as follows:
     ```
     JWT_SECRET=your_generated_secret
     ```

4. **Start the server**:
   ```bash
   node chatapp-backend/server.js OR cd chatapp-backend && npm start
   ```

5. **Run the frontend**:
   ```bash
   cd chatapp-frontend && npm start
   ```

## Usage

After setting up, navigate to `localhost:3000` on your browser to access the ChatApp.

- **Login/Signup**: Create a new account or log in to an existing one.
- **Start Chatting**: Choose a user from the user list and start your conversation.

![](https://github.com/darthjeditt/chatApp/blob/main/gifs/gif1.gif)

## Contribute

Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request