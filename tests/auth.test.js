// Authentication tests
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');
const {connect, closeDatabase, clearDatabase} = require('./setup');

describe('Authentication Routes', () => {
    let server;
    beforeAll((done) => {
        server = app.listen(4000, () => {
            console.log('Test server running on port 4000');
            done();
        });
    });
    afterAll((done) => {
        server.close(() => {
            console.log('Test server closed');
            done();
        });
        closeDatabase();
    });

    beforeEach(async () => {
        await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'testpassword'
        });
    });
    
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'newuser',
                email: 'newuser@example.com',
                password: 'newpassword'
            });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('username', 'newuser');
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'testpassword'
            });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toHaveProperty('username', 'testuser');
    });

    it('should not login with incorrect password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'testuser@example.com',
                password: 'wrongpassword'
            });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'Invalid email or password');
    });

    it('should not register with existing email', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'anotheruser',
                email: 'testuser@example.com',
                password: 'anotherpassword'
            });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message', 'User with this email already exists');
    });
    });