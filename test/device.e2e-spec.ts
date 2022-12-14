import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createDevice } from './mock/device';

let app: INestApplication;
let deviceId: string;

jest.setTimeout(60000);
beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
});

describe('DeviceController (e2e)', () => {
  it('[Removing test data] /device/test (PUT)', () => {
    return request(app.getHttpServer()).delete('/device/test/').expect(200);
  });

  it('[Create a device][success][201] /device (POST)', async () => {
    const data = await request(app.getHttpServer())
      .post('/device/')
      .send(createDevice)
      .expect(201);
    deviceId = data.body._id;
    fs.writeFileSync('./deviceId.tst', deviceId);
  });

  it('[Create a device][duplicate][409] /device (POST)', () => {
    return request(app.getHttpServer())
      .post('/device/')
      .send(createDevice)
      .expect(409);
  });

  it('[Get the device][success][200] /device (GET)', () => {
    return request(app.getHttpServer()).get(`/device/${deviceId}`).expect(200);
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
    expect(data.body.data.length).not.toBeLessThan(0);
  });
});

describe('DeviceOutPutController (e2e)', () => {
  it('[Add new output][success][201] /device/block/output/deviceId (PUT)', async () => {
    await request(app.getHttpServer())
      .put('/device/block/output/' + deviceId)
      .send({
        name: 'test_output',
      })
      .expect(200);
  });

  it('[Check output][success][201] /device (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get(`/device/${deviceId}`)
      .send({
        name: 'test_output',
        _id: deviceId,
      })
      .expect(200);
    expect(data?.body?.outputs[0]?.name).toBe('test_output');
  });

  it('[Deactive output][success][200] /device/block/output/update-active-status (PUT)', async () => {
    await request(app.getHttpServer())
      .put(`/device/block/output/update-active-status/${deviceId}`)
      .send({
        name: 'test_output',
        active: false,
      })
      .expect(200);
  });

  it('[Check if output deactived][success][201] /device (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get(`/device/${deviceId}`)
      .expect(200);
    expect(data.body.outputs[0].active).toBe(false);
  });
});

describe('DeviceConditionController (e2e)', () => {
  it('[Get Segments][success][200] /device/block/condition/segments (GET)', async () => {
    await request(app.getHttpServer())
      .get('/device/block/condition/segments')
      .expect(200);
  });

  it('[Insert Custom Segments][success][200] /device/block/condition/custom-segments (POST)', async () => {
    await request(app.getHttpServer())
      .post('/device/block/condition/custom-segments')
      .send({
        name: '_test',
      })
      .expect(201);
  });

  it('[Get Custom Segments][success][200] /device/block/condition/custom-segments (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get('/device/block/condition/custom-segments')
      .expect(200);
    expect(Array.isArray(data.body.data)).toBe(true);
    expect(data.body.data.length).not.toBeLessThan(0);
  });

  it('[Get Operations][success][200] /device/block/condition/operations (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get('/device/block/condition/operations')
      .expect(200);
    expect(Array.isArray(data.body.data)).toBe(true);
    expect(data.body.data.length).not.toBeLessThan(0);
  });

  it('[Get Compares][success][200] /device/block/condition/compares (GET)', async () => {
    const data = await request(app.getHttpServer())
      .get('/device/block/condition/compares')
      .expect(200);
    expect(Array.isArray(data.body.data)).toBe(true);
    expect(data.body.data.length).not.toBeLessThan(0);
  });
});
