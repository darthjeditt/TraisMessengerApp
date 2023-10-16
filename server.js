const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Open MongoDB Connection
async function connectToDb() {
    try {
        await mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error)
    }
}

// Close MongoDB Connection
async function disconnectFromDB() {
    try {
        await mongoose.connection.close();
        console.log('MongoDB Disconnected');
    } catch (error) {
        console.error('Failed to disconnect from MongoDB', error);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = {app, connectToDb, disconnectFromDB};