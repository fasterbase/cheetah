import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import { WorkSpaceDto } from '@cheetah/dtos/storage';

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

it('[Removing Storage Test Data] /extension/test (PUT)', () => {
  return request(app.getHttpServer()).delete('/storage/test/').expect(200);
});

describe('WorkSpaceController (e2e)', () => {
  it('[Create Workspace][success][201] /storage/workspace (POST)', async () => {
    const dataToSend: WorkSpaceDto = {
      name: '_test',
    };
    await request(app.getHttpServer())
      .post('/storage/workspace')
      .send(dataToSend)
      .expect(201);
  });

  it('[Get Workspace][success][200] /storage/workspace (Get)', async () => {
    const data = await request(app.getHttpServer())
      .get('/storage/workspace')
      .expect(200);
    expect(data.body.workspaces.length).toBe(1);
  });
});
