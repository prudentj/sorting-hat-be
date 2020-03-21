const db = require('../../database/connection.js');
require('dotenv').config({ path: '../../config/.env'});
const request = require('supertest');
const server = require('../api/server.js');

describe('questions router', () => {
    describe('test environment', function () {
        it('should use the staging environment', function () {
            expect(process.env.NODE_ENV).toBe('staging');
        })
    })

    describe('GET /api/questions', function () {
        it('should return all the questions', function () {
            return request(server)
            .get('/api/questions')
            .expect(200);
        });
    })

    describe('GET /api/questions/:id', function () {
        it('should return all the questions', function () {
            return request(server)
            .get('/api/questions/1')
            .expect(200);
        });
    })
});