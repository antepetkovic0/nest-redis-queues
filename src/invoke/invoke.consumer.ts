import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { InvokeProducer } from './invoke.producer';
import { InvokeDto } from 'src/types/invoke.dto';

@Processor('notify-completion')
export class InvokeNotifyConsumer {
  @Process('notify-completion-job')
  notifyCompletion(job: Job<unknown>) {
    console.log(`processing notify job ${job.id}`);
    console.log(job.data);
    console.log(`finished processing notify job ${job.id}`);
  }
}

@Processor('import-data')
export class InvokeImportConsumer {
  constructor(private readonly invokeProducer: InvokeProducer) {}

  @Process('import-data-job')
  importData(job: Job<unknown>) {
    console.log(`processing import job ${job.id}`);
    console.log(job.data);
    console.log(`finished processing import job ${job.id}`);

    this.invokeProducer.notifyCompletion(job.data as InvokeDto);
  }
}
