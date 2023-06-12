import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('import-data')
export class ImportDataController {
  constructor(
    @InjectQueue('import-data') private readonly importDataQueue: Queue,
  ) {}

  @Post('import')
  async import() {
    console.log('in import controller');
    this.importDataQueue.add('import-data-job', {
      text: 'test',
    });
    return 'ok';
  }
}
