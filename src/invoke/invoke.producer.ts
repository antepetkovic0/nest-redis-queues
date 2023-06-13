import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { InvokeDto } from 'src/types/invoke.dto';

// job producers add jobs to queues
@Injectable()
export class InvokeProducer {
  constructor(
    @InjectQueue('notify-completion') private notifyCompletionQueue: Queue,
    @InjectQueue('import-data') private importDataQueue: Queue,
    @InjectQueue('export-data') private exportDataQueue: Queue,
  ) {}

  async notifyCompletion(data: InvokeDto) {
    await this.notifyCompletionQueue.add('notify-completion-job', data, {
      attempts: 3,
      removeOnComplete: true,
    });
  }

  async importData(data: InvokeDto) {
    // in real world scenario will recieve delay from data argument
    const delay = 5000;
    await this.importDataQueue.add('import-data-job', data, {
      delay,
      attempts: 3,
      removeOnComplete: true,
    });
  }

  async exportData(data: InvokeDto) {
    await this.exportDataQueue.add('export-data-job', data, {
      attempts: 3,
      removeOnComplete: true,
    });
  }
}
