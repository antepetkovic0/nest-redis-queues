import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ImportDataController } from './import-data.contoller';
import { ImportDataProcessor } from './import-data.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'import-data',
    }),
  ],
  controllers: [ImportDataController],
  providers: [ImportDataProcessor],
})
export class ImportDataModule {}
