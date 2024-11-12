require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Verify MongoDB URI
console.log("MongoDB URI:", process.env.MONGODB_URI);

// API endpoint to get cumulative item counts
app.get('/api/cumulative-items', async (req, res) => {
    console.log("Received request to /api/cumulative-items");
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();

        const database = client.db('inventory_database');
        const cumulativeCountsCollection = database.collection('cumulative_counts');

        // Fetch data from the cumulative_counts collection
        const cumulativeCounts = await cumulativeCountsCollection.find().toArray();
        console.log("Cumulative Counts:", cumulativeCounts);

        res.json(cumulativeCounts);
    } catch (error) {
        console.error("Error fetching cumulative items:", error);
        res.status(500).json({ message: 'Error fetching cumulative items', error });
    } finally {
        await client.close();
    }
});

// API endpoint to get real-time item counts
app.get('/api/real-time-items', async (req, res) => {
    console.log("Received request to /api/real-time-items");
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();

        const database = client.db('inventory_database');
        const realTimeCountsCollection = database.collection('real_time_counts');

        // Fetch data from the real_time_counts collection
        const realTimeCounts = await realTimeCountsCollection.find().toArray();
        console.log("Real-Time Counts:", realTimeCounts);

        res.json(realTimeCounts);
    } catch (error) {
        console.error("Error fetching real-time items:", error);
        res.status(500).json({ message: 'Error fetching real-time items', error });
    } finally {
        await client.close();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
