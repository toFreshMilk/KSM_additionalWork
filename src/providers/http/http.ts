import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isDev, isMember } from '../../app/app.config';
import { Device } from '@ionic-native/device';
import { Events, Platform } from 'ionic-angular';
import { PopupProvider } from '../popup/popup';
import 'rxjs/operator/toPromise';
import { timeout } from 'rxjs/operators';

@Injectable()
export class HttpProvider {

  private contextUrl = 'https://ksm.krx.co.kr';

  constructor(public http: HttpClient,
              private device: Device,
              private popup: PopupProvider,
              private events: Events,
              private platform: Platform) {
    this.setContextUrl();
  }

  private setContextUrl() {
    // 개발중일 경우
    if (isDev) this.contextUrl = 'https://t-ksm.krx.co.kr';
    // 회원사의 경우
    if (isMember) this.contextUrl = 'https://m-ksm.krx.co.kr';
  }

  get(url, params = {}) {
    return this.http.get(this.contextUrl + this.makeUrlAndQuery(url, params), {
      withCredentials: true
    }).pipe(
      timeout(1000* 30),
    );
  }

  post(url, body = {}) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

    return this.http.post(this.contextUrl + this.makeUrlAndQuery(url, body), undefined, {
      headers: headers,
      withCredentials: true
    }).pipe(
      timeout(1000* 30),
    );
  }

  isRequireLogin(resp: any) {
    return resp.info && resp.info['__NEED_LOGIN__'] === 'ok';
  }

  // TCP 에러 발생여부 확인
  hasTcpException(resp: any) {
    return resp.info && resp.info.TcpException === 'true';
  }

  // TCP 에러 컨트롤
  occurTcpException(resp: any, handler?: Function) {
    if (this.hasTcpException(resp)) {
      if (handler) {
        this.popup.simpleAlert(resp.info.TcpMessage).present().then(() => {
          handler(resp.info.TcpMessageCode, resp.info.TcpMessage);
        });
      } else {
        this.popup.simpleAlert(resp.info.TcpMessage).present();
      }
      return true;
    }
    return false;
  }

  private makeUrlAndQuery(url: string, params: any) {
    let generatedURL = '';
    let generatedParams = [];

    // URL Parsing
    // /mobileApp/common?work=getCloudFundList
    let path = url.split('?');
    let _url = path[0];
    // query에는 query 시작시 붙히는 ? 외에는 나오지 않는다는 전제하에 path[1]로 고정
    let _urlParams = path[1];

    // url 저장
    if (!_url.startsWith('/')) {
      _url = '/' + _url;
    }
    generatedURL = _url + '?';

    // url에서 Parsing한 파라미터 저장
    generatedParams.push(_urlParams);

    // Params Parsing
    let parsingQuery = [];
    for (let key in params) {
      parsingQuery.push(`${key}=${params[key]}`);
    }

    generatedParams = [...generatedParams, ...parsingQuery];

    // 공통 쿼리 추가
    let preventCache = `____q=${Math.random()}`;
    let uuid = `D_UUID=${this.platform.is('cordova') ? this.device.uuid : 'chrome_test'}`;

    generatedParams.push(preventCache);
    generatedParams.push(uuid);

    return generatedURL + generatedParams.join('&');
  }
}
