import { PaginationDto } from '@cheetah/dtos';
import { CommandDto } from '@cheetah/dtos/extension';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ExtensionService } from '../services/extension.service';

@Controller('extension')
export class ExtensionController {
  constructor(private readonly extensionService: ExtensionService) {}
  @Post()
  async addCommand(@Body() commandDto: CommandDto): Promise<CommandDto> {
    commandDto.companyId = 'STATIC_CID';
    return await this.extensionService.addCommand(commandDto);
  }

  @Get()
  async getCommandsList(
    @Query() commandDto: CommandDto,
  ): Promise<PaginationDto<CommandDto>> {
    commandDto.companyId = 'STATIC_CID';
    const data = await this.extensionService.getCommandsList(commandDto);
    return {
      data,
      more: false,
    };
  }
}
