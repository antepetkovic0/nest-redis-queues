import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('import-data')
export class ImportDataProcessor {
  private readonly logger = new Logger(ImportDataProcessor.name);

  @Process('import-data-job')
  handleTranscode(job: Job) {
    this.logger.debug('Start job...');
    this.logger.debug(job.data);
    this.logger.debug('Job completed');
  }
}
