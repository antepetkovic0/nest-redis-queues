import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { InvokeDto } from 'src/types/invoke.dto';

@Injectable()
export class InvokeProducer {
  constructor(
    @InjectQueue('notify-completion') private notifyCompletionQueue: Queue,
    @InjectQueue('import-data') private importDataQueue: Queue,
    @InjectQueue('export-data') private exportDataQueue: Queue,
  ) {}

  async notifyCompletion(data: InvokeDto) {
    await this.notifyCompletionQueue.add('notify-completion-job', data, {
      delay: 5000,
    });
  }

  async importData(data: InvokeDto) {
    await this.importDataQueue.add('import-data-job', data);
  }

  async exportData(data: InvokeDto) {
    await this.exportDataQueue.add('export-data-job', data);
  }
}
