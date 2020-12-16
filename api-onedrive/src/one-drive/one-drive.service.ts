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
      client_id: 'ae5bc1a0-e73e-413d-b913-1dadc3649ccc',
      client_secret: 'VJTHVeQh0lnVKcOIo/Eb/ewz9k9VN_[5',
      username: 'info5@29deoctubre.fin.ec',
      password: 'Quito123',
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
          console.log(respuesta.data.access_token);
          // onedriveApi.items.createFolder({
          //   accessToken: respuesta.data.access_token,
          //   rootItemId: 'root',
          //   name: 'testing-api',
          // }).then((item) => {
          //   console.log(item);
          //   // returns body of https://dev.onedrive.com/items/create.htm#response
          // }).catch(error => {
          //   console.log(error);
          // });
          onedriveApi.items.listChildren({
            accessToken: respuesta.data.access_token,
            itemId: 'root',
            drive: 'me', // 'me' | 'user' | 'drive' | 'group' | 'site'
            driveId: '', // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
          }).then((childrens) => {
            // list all children of given root directory
            //
            console.log(childrens);
            // returns body of https://dev.onedrive.com/items/list.htm#response
          }).catch(error=>{
            console.log(error);
          });
          // this.enviarCorreo(
          //   'orlando.kj24@gmail.com',
          //   'kevin',
          //   'hahahahah',
          //   respuesta.data.access_token,
          // ).subscribe(
          //   (res) => {
          //     console.log(res);
          //   },
          //   (error) => {
          //     console.log('err');
          //     console.log(Object.keys(error));
          //     // console.log(error);
          //   },
          // );
        });
    } catch (e) {
      console.log(e);
      return 'Error';
    }

  }


}
