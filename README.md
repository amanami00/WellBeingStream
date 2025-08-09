# WellBeing Stream

WellBeing Stream is a web application for discovering and watching wellbeing documentaries. This guide will help you download and run the project on your computer.

## Features

- Browse and watch wellbeing documentaries
- Filter by categories like Mindfulness, Inspiration, and more
- Add documentaries to your list
- Responsive design for desktop and mobile

## Prerequisites

Before you start, make sure you have these installed:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [Git](https://git-scm.com/)

## Getting Started

git clone https://github.com/your-repo-url.git
### 1. Download the Project

To get started, you need to download the project files to your computer.

**Option 1: Download ZIP**
1. Go to the [GitHub page](https://github.com/your-repo-url).
2. Click the green **Code** button and select **Download ZIP**.
3. Unzip the downloaded file to a folder on your computer.

**Option 2: Clone with Git**
1. Open a terminal (Command Prompt, Terminal, etc.).
2. Run the following commands:
    ```sh
    git clone https://github.com/your-repo-url.git
    cd WellBeingStream
    ```

### 2. Install Dependencies

This project has two main parts:
- **Server** (in the root folder)
- **Client** (in the `client` folder)

You need to install dependencies for both parts before running the application.

#### Server Setup (Root Folder)
1. Open a terminal and navigate to the project root folder:
    ```sh
    cd WellBeingStream
    ```
2. Install server dependencies:
    ```sh
    npm install
    ```

#### Client Setup
1. Open a new terminal window and navigate to the `client` folder:
    ```sh
    cd WellBeingStream/client
    ```
2. Install client dependencies:
    ```sh
    npm install
    ```

### 3. Run the Application

You need to start both the server and client in separate terminal windows. This allows the backend (server) and frontend (client) to work together.

#### Start the Server (Root Folder)
In the terminal inside the project root folder, run:
```sh
npm run dev
```
The server will start and listen for requests (usually at [http://localhost:5001](http://localhost:5001)).

#### Start the Client
In the terminal inside the `client` folder, run:
```sh
npm start
```
The client will start and open the web application (usually at [http://localhost:3000](http://localhost:3000)).

### 4. Open the App

Once both the server and client are running, open your web browser and go to:

[http://localhost:3000](http://localhost:3000)

You should now see the WellBeing Stream application. You can browse, filter, and watch wellbeing documentaries.

> **Tip:** Keep both terminal windows open and running while you use the app. If you close either one, the application will stop working.
    ```sh
    cd client
    ```
2. Install client dependencies:
    ```sh
    npm install
    ```
3. Start the client:
    ```sh
    npm start
    ```
   The client will start (usually at [http://localhost:3000](http://localhost:3000)).

Open your web browser and go to [http://localhost:3000](http://localhost:3000) to use WellBeing Stream.

You should keep both terminals running while

## Troubleshooting

- If you see errors, make sure Node.js is installed and you are in the correct folder.
- If you have questions, contact the project maintainer or open an issue on GitHub.

## License

This project is licensed under the MIT License.

---

Enjoy exploring wellbeing documentaries!
