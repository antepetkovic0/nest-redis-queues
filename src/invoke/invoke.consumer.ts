import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notify-completion')
export class InvokeConsumer {
  @Process('notify-completion-job')
  notifyCompletion(job: Job<unknown>) {
    console.log(`processing job ${job.id}`);
    console.log(job.data);
    console.log(`finished processing job ${job.id}`);
  }
}
