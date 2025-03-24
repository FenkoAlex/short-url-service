import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';

import { ApiController } from './contrellers/api.controller';
import { ApiService } from './services/api.service';
import { drizzleProvider } from './drizzle.provider';

import type { INestApplication } from '@nestjs/common';

const alias = uuid().slice(0, 8);
const originalUrl = 'http://127.0.0.1:3000/test';

describe('ApiController', () => {
  let apiController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService, ...drizzleProvider],
    }).compile();

    apiController = app.get<ApiController>(ApiController);
  });

  describe('root', () => {
    it('should return short url', async () => {
      expect(
        await apiController.shorten({
          originalUrl: originalUrl,
          alias: alias,
        }),
      ).toBe(`${process.env.SERVICE_URL}/${alias}`);
    });
  });
});

describe('app', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [ApiService, ...drizzleProvider],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`redirect`, () => {
    const test = request(app.getHttpServer())
      .get(`/v1/${alias}`)
      .expect('Location', originalUrl);
    return test;
  });
});
