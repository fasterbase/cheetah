import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CommandDto } from '@cheetah/dtos/extension';
import * as fs from 'fs';

const deviceId = fs.readFileSync('./deviceId.tst', 'utf-8');

let app: INestApplication;
jest.setTimeout(60000);
beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
});

it('[Removing Extension Test Data] /extension/test (PUT)', () => {
  return request(app.getHttpServer()).delete('/extension/test/').expect(200);
});

describe('ExtensionController (e2e)', () => {
  it('[Create Command][success][201] /extension/command (POST)', async () => {
    const dataToSend: CommandDto = {
      name: '_test',
      deviceId,
      parameterName: '_test',
      parameterValue: '_test',
    };
    await request(app.getHttpServer())
      .post('/extension/command')
      .send(dataToSend)
      .expect(201);
  });

  it('[Get Commands List][success][200] /extensio/command (Get)', async () => {
    const data = await request(app.getHttpServer())
      .get('/extension/command')
      .expect(200);
    expect(data.body.data.length).not.toBeLessThan(0);
  });

  it('[Get Available Action List][success][200] /extension/action-list (Get)', async () => {
    const data = await request(app.getHttpServer())
      .get('/extension/action-list')
      .expect(200);
    expect(data.body.data.length).not.toBeLessThan(0);
  });
});
