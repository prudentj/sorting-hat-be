require('dotenv').config({ path: '../../config/.env' });
const request = require('supertest');
const server = require('../api/server.js');
const db = require('../../database/connection.js');

describe('points router', () => {
	describe('test environment', function() {
		it('should use the staging environment', function() {
			expect(process.env.NODE_ENV).toBe('staging');
		});
	});

	describe('GET /api/points', function() {
		it('Returns all the points and the corresponding points per answer choice.', function() {
			return request(server).get('/api/points').expect(200);
		});
	});

	describe('GET /api/points/:answerId', function() {
		it('Returns all the points associated with each track per answer choice.', function() {
			return request(server).get('/api/points/1').expect(200);
		});
		it('Returns an error.', function() {
			return request(server).get('/api/points/1000').expect(400);
		});
	});

	describe('GET /api/points/:answerId/:trackId', function() {
		it('Returns all the points associated with the specified track and answer choice.', function() {
			return request(server).get('/api/points/1/2').expect(200);
		});
		it('Returns an error.', function() {
			return request(server).get('/api/points/1000/1000').expect(400);
		});
	});

	describe('PUT /api/points/:answerId/:trackId', function() {
		it('Updates the point associated with the specified track and answer choice.', function() {
			return request(server).put('/api/points/1/2').send({ points: 4 }).expect(200);
		});
		it('Returns an error.', function() {
			return request(server).put('/api/points/1/2').send({ points: 3 }).expect(200);
		});
		it('Returns an error.', function() {
			return request(server).put('/api/points/100/200').send({ points: 3 }).expect(400);
		});
	});
});

afterAll(async () => {
	await new Promise((resolve) => setTimeout(() => resolve(), 1000)); // avoid jest open handle error
	await db.seed.run();
	await db.raw(
		'ALTER TABLE points ADD CONSTRAINT points_answer_id_foreign FOREIGN KEY(answer_id) REFERENCES answers(id)'
	);
	await db.raw(
		'ALTER TABLE answers ADD CONSTRAINT answers_question_id_foreign FOREIGN KEY(question_id) REFERENCES questions(id)'
	);
});
