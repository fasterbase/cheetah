import { Test, TestingModule } from '@nestjs/testing';
import { DtosService } from './dtos.service';

describe('DtosService', () => {
  let service: DtosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DtosService],
    }).compile();

    service = module.get<DtosService>(DtosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
