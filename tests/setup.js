// Create in-memory database for testing
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
let mongoServer;

const connect = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('Connected to in-memory MongoDB');
}
const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    console.log('Disconnected from in-memory MongoDB');
}
const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
    console.log('Cleared in-memory MongoDB database');
}
beforeAll( async () => {
    connect();
});
afterAll(async () => {
    closeDatabase();
});
afterEach( async () => {
    clearDatabase();
});

module.exports = {
    connect,
    closeDatabase,
    clearDatabase
};