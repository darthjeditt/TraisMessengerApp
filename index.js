const { app, server, connectToDb } = require('./server');

const PORT = 3000;

if (process.env.NODE_ENV !== 'test') {
    connectToDb()
        .then(() => {
            server.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.error('Failed to connect to Database', err);
        });
}
