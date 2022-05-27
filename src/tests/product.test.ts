import app from '../app';
import supertest from 'supertest';

const request = supertest(app);

afterAll(async () => {
	await new Promise<void>((resolve) => setTimeout(resolve, 500));
});

describe('Testing Products', () => {
	describe('[GET] users', () => {
		it('response statusCode 200 / findAll', async () => {
			request
				.post('/graphql')
				.send({
					query: '{ products: { id, name } }',
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return;
					expect(res.body).toBeInstanceOf(Object);
					console.log(res.body.data);

					expect(res.body.data.products.length).toEqual(3);
					return;
				});
		});
	});
});
