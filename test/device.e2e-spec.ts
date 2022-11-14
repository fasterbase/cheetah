import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createDevice } from './mock/device';

describe('DeviceController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Testing device Endpoints', () => {
    it('[removing test data] /device/test (PUT)', () => {
      return request(app.getHttpServer()).delete('/device/test/').expect(200);
    });

    it('[create a device] /device (POST)', () => {
      console.log({ createDevice });
      return request(app.getHttpServer())
        .post('/device/')
        .send(createDevice)
        .expect(201);
    });
  });
});
