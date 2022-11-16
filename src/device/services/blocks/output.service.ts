import { OutputDto } from '@cheetah/dtos/devices';
import { Injectable } from '@nestjs/common';
import { OutputRepository } from '../../repositories/blocks/output.repository';

@Injectable()
export class OutputService {
  constructor(private readonly outputBlockRepository: OutputRepository) {}

  async addOrUpdateOutput(outputDto: OutputDto): Promise<boolean> {
    outputDto.companyId = 'STATIC_CID';
    outputDto.active = true;
    return await this.outputBlockRepository.addOrUpdateOutput(outputDto);
  }

  async updateActiveStatus(outputDto: OutputDto): Promise<boolean> {
    outputDto.companyId = 'STATIC_CID';
    return await this.outputBlockRepository.updateActiveStatus(outputDto);
  }
}
