# Appwrite To-Do Application

This repository contains an Express-based backend for a simple To-Do application using Appwrite. The backend provides RESTful APIs for creating, retrieving, updating, and deleting tasks.

## Features

- **Database Setup**: Automatically sets up the database and collection in Appwrite.
- **CRUD Operations**: APIs for managing to-do tasks.
- **Seed Data**: Populates the database with initial tasks.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- An [Appwrite Cloud](https://appwrite.io/cloud) or self-hosted instance

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and add the following keys:

```env
APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
APPWRITE_PROJECT_ID=<YOUR_PROJECT_ID>
APPWRITE_API_KEY=<YOUR_API_KEY>
```

- Replace `<YOUR_PROJECT_ID>` with your Appwrite project ID.
- Replace `<YOUR_API_KEY>` with your Appwrite API key (ensure it has sufficient permissions for `databases.write` and `databases.read`).

### 4. Run the Server

Start the Express server:

```bash
npm start
```

The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### 1. Create Task

- **URL**: `/tasks`
- **Method**: `POST`
- **Body**:
  
  ```json
  {
    "title": "Buy groceries",
    "description": "Get milk, eggs, and bread",
    "isComplete": false
  }
  ```
- **Response**: Returns the created task.

### 2. Get All Tasks

- **URL**: `/tasks`
- **Method**: `GET`
- **Response**: Returns a list of all tasks.

### 3. Update Task

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Body**:
  
  ```json
  {
    "title": "Buy groceries",
    "description": "Get milk and eggs",
    "isComplete": true
  }
  ```
- **Response**: Returns the updated task.

### 4. Delete Task

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Response**: Returns status `204 No Content` if successful.

## Testing with Postman

1. Import the API endpoints into Postman.
2. Start by creating tasks using the `/tasks` endpoint.
3. Retrieve, update, and delete tasks using their respective endpoints.


## Notes

- Ensure that your Appwrite API key has the necessary permissions for the operations.
- The database and collection are automatically created when the server starts for the first time.

## License

This project is licensed under the MIT License.
