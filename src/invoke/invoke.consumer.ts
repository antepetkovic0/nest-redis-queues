import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { InvokeProducer } from './invoke.producer';
import { InvokeDto } from 'src/types/invoke.dto';
import { fakePromise } from 'src/utils/fake-promise';

// consumer is a class defining methods that either process jobs added into the queue, or listen for events on the queue, or both

@Processor('notify-completion')
export class InvokeNotifyConsumer {
  @Process('notify-completion-job')
  async notifyCompletion(job: Job<unknown>) {
    console.log(`processing notify job ${job.id}`);
    await fakePromise(2000, true);
    console.log(`finished processing notify job ${job.id}`);
  }
}

@Processor('import-data')
export class InvokeImportConsumer {
  constructor(private readonly invokeProducer: InvokeProducer) {}

  @Process('import-data-job')
  async importData(job: Job<unknown>) {
    console.log(`processing import job ${job.id}`);
    await fakePromise(2000, false);
    console.log(`finished processing import job ${job.id}`);

    this.invokeProducer.notifyCompletion(job.data as InvokeDto);
  }
}

@Processor('export-data')
export class InvokeExportConsumer {
  constructor(private readonly invokeProducer: InvokeProducer) {}

  @Process('export-data-job')
  exportData(job: Job<unknown>) {
    console.log(`processing export job ${job.id}`);
    console.log(job.data);
    console.log(`finished processing export job ${job.id}`);

    const isForImport = true;
    const lastPage = true;

    if (isForImport) {
      this.invokeProducer.importData(job.data as InvokeDto);
    } else if (lastPage) {
      this.invokeProducer.notifyCompletion(job.data as InvokeDto);
    }
  }
}
