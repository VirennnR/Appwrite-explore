require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sdk = require('node-appwrite');

const app = express();
app.use(bodyParser.json());

const client = new sdk.Client();

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT) 
    .setProject(process.env.APPWRITE_PROJECT_ID) 
    .setKey(process.env.APPWRITE_API_KEY); 

const databases = new sdk.Databases(client);

let todoDatabase;
let todoCollection;

async function prepareDatabase() {
    todoDatabase = await databases.create(
        sdk.ID.unique(),
        'TodosDB'
    );

    todoCollection = await databases.createCollection(
        todoDatabase.$id,
        sdk.ID.unique(),
        'Todos'
    );

    await databases.createStringAttribute(
        todoDatabase.$id,
        todoCollection.$id,
        'title',
        255,
        true
    );

    await databases.createStringAttribute(
        todoDatabase.$id,
        todoCollection.$id,
        'description',
        255,
        false,
        'This is a test description'
    );

    await databases.createBooleanAttribute(
        todoDatabase.$id,
        todoCollection.$id,
        'isComplete',
        true
    );

    console.log("Database and collection are ready.");
}

async function seedDatabase() {
    const tasks = [
        { title: 'Buy apples', description: 'At least 2KGs', isComplete: true },
        { title: 'Wash the apples', isComplete: true },
        { title: 'Cut the apples', description: 'Don\'t forget to pack them in a box', isComplete: false },
    ];

    for (const task of tasks) {
        await databases.createDocument(
            todoDatabase.$id,
            todoCollection.$id,
            sdk.ID.unique(),
            task
        );
    }

    console.log("Seeded the database with initial tasks.");
}

app.post('/tasks', async (req, res) => {
    const { title, description, isComplete } = req.body;
    try {
        const response = await databases.createDocument(
            todoDatabase.$id,
            todoCollection.$id,
            sdk.ID.unique(),
            { title, description, isComplete }
        );
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const response = await databases.listDocuments(todoDatabase.$id, todoCollection.$id);
        res.status(200).json(response.documents);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    try {
        const response = await databases.updateDocument(
            todoDatabase.$id,
            todoCollection.$id,
            id,
            { title, description, isComplete }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await databases.deleteDocument(todoDatabase.$id, todoCollection.$id, id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

async function startServer() {
    try {
        await prepareDatabase();
        await seedDatabase();
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
    }
}

startServer();
