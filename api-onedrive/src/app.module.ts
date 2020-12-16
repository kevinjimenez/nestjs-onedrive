import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OneDriveService } from './one-drive/one-drive.service';
import { OneDriveController } from './one-drive/one-drive.controller';
import { OneDriveModule } from './one-drive/one-drive.module';

@Module({
  imports: [OneDriveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
