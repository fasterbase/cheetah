import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createDevice } from './mock/device';

describe('DeviceController (e2e)', () => {
  let app: INestApplication;
  let deviceId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('Testing device Endpoints', () => {
    it('[Removing test data] /device/test (PUT)', () => {
      return request(app.getHttpServer()).delete('/device/test/').expect(200);
    });

    it('[Create a device][success][201] /device (POST)', async () => {
      const data = await request(app.getHttpServer())
        .post('/device/')
        .send(createDevice)
        .expect(201);
      deviceId = data.body._id;
    });

    it('[Create a device][duplicate][409] /device (POST)', () => {
      return request(app.getHttpServer())
        .post('/device/')
        .send(createDevice)
        .expect(409);
    });

    it('[Get the device][success][200] /device (GET)', () => {
      return request(app.getHttpServer())
        .get(`/device/${deviceId}`)
        .expect(200);
    });

    it('[Get the device][not found][404] /device (GET)', () => {
      return request(app.getHttpServer())
        .get(`/device/636b8788c03a4994476daaba`)
        .expect(404);
    });

    it('[Get devices][success][200] /device/list (GET)', async () => {
      const data = await request(app.getHttpServer())
        .get(`/device/list`)
        .expect(200);

      expect(Array.isArray(data.body.data)).toBe(true);
    });
  });
});
