import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ActionDto, CommandDto } from '@cheetah/dtos/extension';
import * as fs from 'fs';
import { ActionType } from '@cheetah/constants/extension';

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
      description: 'This is a test command',
      deviceId,
      parameterName: '_test',
      parameterValue: '_test',
    };
    await request(app.getHttpServer())
      .post('/extension/command')
      .send(dataToSend)
      .expect(201);
  });

  it('[Get Commands List][success][200] /extension/command (Get)', async () => {
    const data = await request(app.getHttpServer())
      .get('/extension/command')
      .expect(200);
    expect(data.body.data.length).not.toBeLessThan(0);
  });

  it('[Get Available Action List][success][200] /extension/action/type (Get)', async () => {
    const data = await request(app.getHttpServer())
      .get('/extension/action/type  ')
      .expect(200);
    expect(data.body.data.length).not.toBeLessThan(0);
  });

  it('[Get Available Action Source][success][200] /extension/action/source (Get)', async () => {
    const data = await request(app.getHttpServer())
      .get('/extension/action/source')
      .expect(200);
    expect(data.body.data.length).not.toBeLessThan(0);
  });

  it('[Insert New Action ][success][201] /extension/action/source (POST)', async () => {
    const dataToSend: ActionDto = {
      name: '_test',
      description: 'test description',
      isExternal: false,
      actions: [
        {
          type: ActionType.Market,
          priority: 1,
          market: {
            id: '63777e66c24ffe2a96536e94',
          },
        },
      ],
      status: true,
    };
    await request(app.getHttpServer())
      .post('/extension/action')
      .send(dataToSend)
      .expect(201);
  });

  it('[Get Available Actions][success][200] /extension/action (Get)', async () => {
    const data = await request(app.getHttpServer())
      .get('/extension/action')
      .expect(200);
    expect(data.body.data.length).not.toBeLessThan(0);
  });
});
