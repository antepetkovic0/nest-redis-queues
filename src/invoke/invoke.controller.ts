import { Body, Controller, Post } from '@nestjs/common';
import { InvokeDto } from 'src/types/invoke.dto';
import { InvokeService } from './invoke.service';

@Controller('invoke')
export class InvokeController {
  constructor(private readonly invokeService: InvokeService) {}

  @Post()
  async invoke(@Body() body: InvokeDto) {
    this.invokeService.invoke(body);
    return 'OK';
  }
}
