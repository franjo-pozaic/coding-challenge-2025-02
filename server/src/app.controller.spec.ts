
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppointmentBookingModule } from './modules/appointment-booking/appointment-booking.module';
import { INestApplication } from '@nestjs/common';
import { PG_CONNECTION_TOKEN } from './db.module';
import type { PoolClient } from 'pg';

const mockPoolClient = {
    query: (query, values) => {
      return {
        rows: []
      }
    }
} as Partial<PoolClient>

describe('Slots', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppointmentBookingModule],
    })
      .overrideProvider(PG_CONNECTION_TOKEN)
      .useValue(mockPoolClient)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET slots`, () => {
    return request(app.getHttpServer())
      .get('/slots?date=2025-05-02T23:00:00.000Z')
      .expect(200)
      .expect([]);
  });

  it(`/GET slots missing date param`, () => {
    return request(app.getHttpServer())
      .get('/slots')
      .expect(400)
      .expect({
        message: 'Date value is required',
        error: 'Bad Request',
        statusCode: 400
      });
  });

  it(`/GET slots invalid date param`, () => {
    return request(app.getHttpServer())
      .get('/slots?date=123')
      .expect(400)
      .expect({
        message: 'Invalid date format',
        error: 'Bad Request',
        statusCode: 400
      });
  });

  it(`/POST slots invalid id param`, () => {
    return request(app.getHttpServer())
      .post('/slots/invalid/book')
      .send({ name: 'Franjo' })
      .expect(400)
      .expect({
        message: 'Validation failed (numeric string is expected)',
        error: 'Bad Request',
        statusCode: 400
      });
  });

  it(`/POST slots missing body`, () => {
    return request(app.getHttpServer())
      .post('/slots/1/book')
      // .send({})
      .expect(400)
      .expect({
        message: 'Request body invalid',
        error: 'Bad Request',
        statusCode: 400
      });
  });

  it(`/POST slots slot with id not found`, () => {
    jest.spyOn(mockPoolClient, 'query').mockImplementation(() => {
      return {
        rows: []
      }
    });
    return request(app.getHttpServer())
      .post('/slots/1/book')
      .send({ name: 'Franjo' })
      .expect(404)
      .expect({
        message: 'Slot with id 1 not found',
        error: 'Not Found',
        statusCode: 404
      });
  });

  it(`/POST slots`, () => {
    jest.spyOn(mockPoolClient, 'query').mockImplementation(() => {
      return {
        rows: [{ id: 1, booked: true, start_date: '' }]
      }
    });
    return request(app.getHttpServer())
      .post('/slots/1/book')
      .send({ name: 'Franjo' })
      .expect(201)
      .expect({
        id: 1,
        booked: true,
        start_date: ''
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
