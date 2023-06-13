import { Injectable } from '@nestjs/common';
import { InvokeDto } from 'src/types/invoke.dto';
import { InvokeProducer } from './invoke.producer';

@Injectable()
export class InvokeService {
  constructor(private readonly invokeProducer: InvokeProducer) {}

  async invoke(data: InvokeDto) {
    if (data.withData) {
      this.invokeProducer.importData(data);
      console.log('withData');
    } else {
      console.log('withoutData');
    }
  }
}
