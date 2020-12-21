import { HttpService, Injectable } from '@nestjs/common';
import * as qs from 'qs';
import * as onedriveApi from 'onedrive-api';
import { AxiosResponse } from 'axios';


@Injectable()
export class OneDriveService {

  constructor(
    private readonly _httpService: HttpService,
  ) {
  }

  async obtenerAccessToken() {
    const data = qs.stringify({
      client_id: '1ec0ff85-bb4a-473c-88a6-06f9c5838e75',
      client_secret: 'qQG0lIA_c89cwVWw02UX-j~.z-53kndN0x',
      username: 'rcargua@29deoctubre.fin.ec',
      password: 'RCskc1996#2',
      grant_type: 'password',
      resource: 'https://graph.microsoft.com',
    });

    try {
      const url =
        'https://login.microsoftonline.com/f8733e19-5615-4258-907e-cb8c982ffc34/oauth2/token';
      this._httpService
        .get(url, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data,
        })
        .subscribe((respuesta: AxiosResponse) => {             
          console.log(respuesta);    
          onedriveApi.items.createFolder({
            accessToken: respuesta.data.access_token,
            drive: 'site', // 'me' | 'user' | 'drive' | 'group' | 'site'
            driveId: 'coop29deoctubre.sharepoint.com,aa1bfc6f-5923-4a1d-af88-de576567dc68,bf0346cb-9286-4d90-8007-00cafce71bb3', // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
            rootItemId: "01R5I4HVJMNFSI7Y4XYVE35KB43KTTFYHQ",
            name: "ONE-DRIVE-PRUEBA"
          }).then((item) => {
          console.log(item)
          // returns body of https://dev.onedrive.com/items/create.htm#response
          }).catch(error=>{
            console.log(error);
          });
          
          onedriveApi.items.listChildren({
            accessToken: respuesta.data.access_token,
            itemId: 'root',
            drive: 'site', // 'me' | 'user' | 'drive' | 'group' | 'site'
            driveId: 'coop29deoctubre.sharepoint.com,aa1bfc6f-5923-4a1d-af88-de576567dc68,bf0346cb-9286-4d90-8007-00cafce71bb3', // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
          }).then((childrens) => {
            // list all children of given root directory
            //
            console.log(childrens);
            // returns body of https://dev.onedrive.com/items/list.htm#response
          }).catch(error=>{
            console.log(error);
          });
        });
    } catch (e) {
      console.log(e);
      return 'Error';
    }

  }


}
