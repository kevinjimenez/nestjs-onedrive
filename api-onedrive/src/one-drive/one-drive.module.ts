import { HttpModule, Module } from '@nestjs/common';
import { OneDriveController } from './one-drive.controller';
import { OneDriveService } from './one-drive.service';

@Module({
  imports: [HttpModule],
  controllers: [OneDriveController],
  providers: [OneDriveService],
  exports:[OneDriveService]
})
export class OneDriveModule {}
