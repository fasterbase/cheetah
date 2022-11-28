import { OutputDto } from '@cheetah/dtos/devices';
import { Injectable } from '@nestjs/common';
import { OutputRepository } from '../repositories/output.repository';

@Injectable()
export class OutputService {
  constructor(private readonly outputBlockRepository: OutputRepository) {}

  async addOrUpdateOutput(options: {
    outputDto: OutputDto;
    deviceId: string;
  }): Promise<boolean> {
    const { outputDto, deviceId } = options;
    outputDto.companyId = 'STATIC_CID';
    outputDto.active = true;
    return await this.outputBlockRepository.addOrUpdateOutput({
      outputDto,
      deviceId,
    });
  }

  async updateActiveStatus(options: {
    outputDto: OutputDto;
    deviceId: string;
  }): Promise<boolean> {
    const { outputDto, deviceId } = options;
    outputDto.companyId = 'STATIC_CID';
    return await this.outputBlockRepository.updateActiveStatus({
      outputDto,
      deviceId,
    });
  }
}
