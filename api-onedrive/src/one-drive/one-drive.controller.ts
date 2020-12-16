import { Controller, Get } from '@nestjs/common';
import { OneDriveService } from './one-drive.service';

@Controller('one-drive')
export class OneDriveController {

  constructor(
    private readonly _oneDrive: OneDriveService,
  ) {
  }

  @Get('access-token')
  obtenerAccessToken() {
    return this._oneDrive.obtenerAccessToken();
  }

}
