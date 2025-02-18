# Task Management App
A full-stack task management application built with NestJS (backend), Next.js (frontend), and MongoDB (database). This app allows users to create, update, delete, and assign tasks. Users can also share tasks as projects, and task owners can unassign users from tasks.

## Features
- **User Authentication:** Secure user registration and login.
- **Task Management:**
  - Create, update, and delete tasks.
  - Assign tasks to other users.
  - Share tasks as projects.
  - Unassign users from tasks.
  - tasks are categorized , users can search tasks by category and also title
- **Project Collaboration:** Users can collaborate on shared tasks.
- **Responsive UI:** Built with Next.js for a seamless user experience.
- **Scalable Backend:** Powered by NestJS for robust and maintainable APIs.

## Technologies Used
- **Frontend:** Next.js, React, TailwindCSS (or any other UI library you're using).
- **Backend:** NestJS, TypeScript.
- **Database:** MongoDB.
- **Authentication:** JWT (JSON Web Tokens).

## Project Structure
The project is divided into two main folders:
- `frontend`: Contains the Next.js application.
- `backend`: Contains the NestJS application.

## Setup Instructions
Follow these steps to set up and run the project locally.

### Prerequisites
- Node.js (v16 or higher) installed.
- MongoDB installed and running locally or a connection string for a remote MongoDB instance.
- Git (optional, for cloning the repository).

### Step 1: Clone the Repository
```bash
git clone https://github.com/ziadAshraf7/Task-Management-App.git
cd Task-Management-App
```

### Step 2: Set Up the Backend
Navigate to the backend folder:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Create a `.env` file in the backend folder and add the following environment variables:
```env
DATABASE_HOST=mongodb+srv://ziad:01006745475@cluster0.lnghtdz.mongodb.net/task_managment?retryWrites=true&w=majority
JWT_KEY=bG1Yk8zqX9NvR3+eY5dP2KcV5sLwT7JfQ4Xh9YzM0VpRnB6ZsJtNqKdX2LgZrWmX
```
Replace `your_jwt_secret_key` with a secure secret key for JWT authentication.

Start the backend server:
```bash
npm run start:dev
```
The backend will run on [http://localhost:4000](http://localhost:4000).

### Step 3: Set Up the Frontend
Navigate to the frontend folder:
```bash
cd ../frontend
```
Install dependencies:
```bash
npm install
```
Start the frontend application:
```bash
npm run dev
```
The frontend will run on [http://localhost:3000](http://localhost:3000).

## Usage
Open your browser and go to [http://localhost:3000](http://localhost:3000).
- Register a new account or log in if you already have one.
- Create, update, or delete tasks.
- Assign tasks to other users or share them as projects.
- Unassign users from tasks if you're the task owner.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and submit a pull request.

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- **NestJS** for the powerful backend framework.
- **Next.js** for the intuitive frontend framework.
- **MongoDB** for the flexible NoSQL database.

## Contact
If you have any questions or feedback, feel free to reach out:
- **Email:** zeyadashraf899@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/ziad-ashraf-8a75bb25a
