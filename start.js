const { server, connectToDb } = require('./server');

const PORT = 3000;

connectToDb().then(() => {
    server.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
});
