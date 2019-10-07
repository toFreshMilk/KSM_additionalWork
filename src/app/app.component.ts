import { Component, ViewChild } from '@angular/core';
import { Events, IonicApp, Keyboard, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/KSM-A-01/home/home';
import { NosProvider } from '../providers/nos/nos';
import { CheckAppVersionProvider } from '../providers/check-app-version/check-app-version';
import { APP_VERSION } from './app.config';
import { AppShieldProvider } from '../providers/app-shield/app-shield';
import { PopupProvider } from '../providers/popup/popup';
import { FidoProvider } from '../providers/fido/fido';
import { DBProvider } from '../providers/db/db';
import { GlobalStateProvider } from '../providers/global-state/global-state';
import { Storage } from '@ionic/storage';
import { ModalProvider } from '../providers/modal/modal';
import { Network } from '@ionic-native/network';
import { SIDE_MENU, SideMenuInterface } from './menu';
import { UtilProvider } from '../providers/util/util';
import { FcmProvider } from '../providers/fcm/fcm';
import { ClausePage } from '../pages/COMMON/clause/clause';
import { CertCenterPage } from '../pages/KSM-A-10/cert-center/cert-center';
import { LogoutProvider } from '../providers/logout/logout';
import { WebsocketProvider } from '../providers/websocket/websocket';
import { PincodeAndFingerSettingPage } from '../pages/KSM-A-10/pincode-and-finger-setting/pincode-and-finger-setting';
import { InputUserinfoPage } from "../pages/KSM-A-08/input-userinfo/input-userinfo";
import { ReissueInputUserinfoPage } from "../pages/KSM-A-09/reissue-input-userinfo/reissue-input-userinfo";
import { PushHistoryPage } from "../pages/KSM-A-06/push-history/push-history";
import { GuideComponent } from "../components/guide/guide";
import { MypagePage } from "../pages/KSM-A-06/mypage/mypage";
import { FavoritesPage } from "../pages/KSM-A-06/favorites/favorites";
import { ConclusionHistoryPage } from "../pages/KSM-A-06/conclusion-history/conclusion-history";
import { OrderSubmitPage } from "../pages/KSM-A-03/order-submit/order-submit";
import { StockCodeProvider } from "../providers/stock-code/stock-code";
import { CommonProvider } from '../providers/common/common';
import { Badge } from '@ionic-native/badge';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  APP_VERSION = APP_VERSION;
  isLogin: boolean;

  menuTree: SideMenuInterface[];
  activeMenu: SideMenuInterface;
  isNotLoginMenu: any;
  isLoginMenu: any;
  listMenu: any;

  // device pause, resume Observable
  private pause$;
  private resume$;

  // 사이드메뉴 헤더 변수
  headerTitle = '로그인이 필요합니다.';
  defaultIcon = true;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private ionicApp: IonicApp,
              private keyboard: Keyboard,
              private menuCtrl: MenuController,
              private popup: PopupProvider,
              private checkAppVersion: CheckAppVersionProvider,
              private globalState: GlobalStateProvider,
              private storage: Storage,
              private appShield: AppShieldProvider,
              private db: DBProvider,
              private fido: FidoProvider,
              public modalCtrl: ModalProvider,
              private events: Events,
              private util: UtilProvider,
              private network: Network,
              private logout: LogoutProvider,
              private common: CommonProvider,
              private websocket: WebsocketProvider,
              private stockCode: StockCodeProvider,
              private badge: Badge,
              private fcm: FcmProvider,
              private nos: NosProvider) {

    this.platform.ready().then(() => {
      // 앱 초기화
      this.initApp().then(() => {
        this.storage.get('guide_never_see').then(v => {
          if (!v) {
            this.modalCtrl.getModal('guide').present().then(() => {
              this.splashScreen.hide();
            });
          } else {
            this.splashScreen.hide();
          }

          this.globalState.runLogoutInterval();

          this.storage.get('gcm_token').then(token => {
            this.websocket.open(token);
          });

          // Fido 권한 체크
          if (this.platform.is('cordova')) {
            this.fido.checkPermission();
          }
        });
      });
    });

    this.menuTree = SIDE_MENU;
    this.activeMenu = this.menuTree[1];

    this.isNotLoginMenu = [
      {title: "회원 가입", page: InputUserinfoPage},
      {title: "알람 내역", page: PushHistoryPage},
      {title: "인증서  재발급", page: ReissueInputUserinfoPage},
      {title: "간편이용 안내", page: GuideComponent}
    ];

    this.isLoginMenu = [
      {title: "관심 종목", page: FavoritesPage},
      {title: "My Page", page: MypagePage},
      {title: "알람 내역", page: PushHistoryPage},
      {title: "주문제출 내역", page: ConclusionHistoryPage}
    ];

    this.listMenu = [
      {title: "개인정보 처리방침", page: ClausePage},
      {title: "법적고지", url: "https://info.krx.co.kr/contents/KRX/06/06070200/KRX06070200.jsp"},
      {title: "고객 서비스 헌장", url: "https://info.krx.co.kr/contents/KRX/06/06010000/KRX06010000.jsp"},
      {title: "KSM 사용자 가이드", url: "http://pdf.krx.co.kr/ebook/ecatalog.jsp?Dir=34&catimage=&callmode=admin"}
    ];

    // 로그인시 헤더 처리
    this.events.subscribe('login', () => {
      this.headerTitle = this.globalState.userInfo.KSM_USR_NM;
      this.defaultIcon = false;
      this.isLogin = true;
    });
    this.events.subscribe('logout', () => {
      this.headerTitle = '로그인이 필요합니다.';
      this.defaultIcon = true;
      this.isLogin = false;
    });

    this.isLogin = this.globalState.isLogin;
  }

  private async initApp() {
    // 전역 화면전환 이벤트 처리 등록
    this.initMovePageEvent();

    // 전역 상태 처리
    this.initGlobalState();

    // DB 설정
    this.db.initNormalTable().then(() => {
      console.log('normal DB init Complete');

      this.db.getNormalData(['cert_user_id', 'user_public_key']).then((res: any) => {
        console.log('#### res is ', res);

        if (res) {
          this.globalState.availableUserPubKey = res.user_public_key;
          this.globalState.availableUserId = res.cert_user_id;

          console.log(`availableUserId : ${this.globalState.availableUserId}`);
          console.log(`availableUserPubKey : ${this.globalState.availableUserPubKey}`);
        }
      });
    });

    // FCM 초기화
    this.fcm.register();

    // 개발이면 패스 - 크롬 확인 용도
    if (!this.platform.is('cordova')) return;

    // device pause, resume 이벤트 처리
    this.initDeviceEvent();

    await this.initPlugins();

    // 앱 버전 체크
    this.checkAppVersion.check();

    // 뒤로가기 오버라이드
    this.platform.registerBackButtonAction(() => {
      // TODO: 회원가입 최종등록 후 뒤로가기 버튼을 누르면 메인으로 이동
      // TODO: 협상 확인 모달이 열린 경우 별도 처리
      // TODO: 뒤로가기 금지인 경우 메인화면으로 이동
      // TODO: 뒤로가기 화면이 전종목현황일 경우 종목화면 매도,매수화면에 대한 연계 페이지 추가
      let isModal = this.ionicApp._modalPortal.getActive();
      let isOverlay = this.ionicApp._overlayPortal.getActive();

      // 메뉴가 열린경우 메뉴 닫기
      if (this.menuCtrl.isOpen()) {
        console.log('메뉴가 열린 경우');
        this.menuCtrl.close();
      }
      // 키보드가 사용중이면 키보드 닫기
      else if (this.keyboard.isOpen() && this.keyboard.hasFocusedTextInput()) {
        console.log('키보드 사용중');
        this.keyboard.close();
      }
      // 현재 페이지가 모달이면 모달 닫기
      else if (isModal) {
        console.log('현재 페이지가 모달');
        if (isModal.data.opts.disableBackButton) return;

        isModal.dismiss();
      }
      // select box 등의 alert 창이 떠있으면 닫기
      // else if (isOverlay && !isOverlay.data.disableBackButton) {
      else if (isOverlay) {
        console.log('현재 페이지가 overlay');
        isOverlay.dismiss();
      }
      // 뒤로가기가 가능한 경우 뒤로가기 수행
      else if (this.nav.canGoBack()) {
        console.log('뒤로가기 가능');
        this.nav.pop();
      }
      // Main화면이 아닌경우 메인화면으로 돌리기
      else if (!this.globalState.isMainPage) {
        console.log('메인 페이지가 아님');
        this.nav.setRoot(HomePage);
      }
      else {
        // 그 외에는 앱 종료
        if (this.globalState.userInfo && this.globalState.userInfo.id) {
          this.logout.logout('exit');
        } else {
          this.popup.makeConfirm('확인',
            `<span>KSM 서비스를 종료 하시겠습니까?</span>`,
            '아니오',
            '예', () => {
              this.nos.quit();
            }).present();
        }
      }
    });
  }

  private async checkAppShield() {
    let {msg, code} = await this.appShield.checkApp();

    if (msg === 'restart') {
      this.popup.makeAlert('알림',
        `<span>위변조 검사에 실패하였습니다.<br>잠시 후 다시 이용해 주시거나 재설치 후 이용바랍니다.</span>`,
        '확인',
        () => {
          this.nos.quit();
        }).present();
    }

    // 성공
    if (msg === 'success') {
      return true;
    }

    // 앱실드 code에 따른 처리
    switch (code) {
      case '41503':   // 가이드 문서에 없음
      case '41404':   // HTTP error code 404
        this.popup.makeAlert('알림',
          '<span>일시적으로 서비스를 이용하실 수 없습니다.<br>잠시 후 다시 이용해 주시기 바랍니다.</span>',
          '확인',
          () => {
            this.nos.quit();
          }).present();
        break;
      case '40001':   // 서버에 접속할 수 없음
      case '40003':   // 응답메세지 없음
      case '40008':   // 세션 타임아웃
      case '41000':   // 비정상적 통신오류
      case '43000':   // 가이드 문서에 없음
      case '45000':   // 가이드 문서에 없음
        this.popup.makeAlert('알림',
          '<span>현재 네트워크 환경이 불안정하여 이용하실 수 없습니다.<br>잠시 후 다시 이용해 주시기 바랍니다.</span>',
          '확인',
          () => {
            this.nos.quit();
          }).present();
        break;
      default :
        this.popup.makeAlert('알림',
          `<span>위변조 앱으로 감지되었습니다.<br>잠시 후 다시 이용해 주시거나 재설치 후 이용바랍니다. [error code : ${code}]</span>`,
          '확인',
          () => {
            this.nos.quit();
          }).present();
        break;
    }

    return true;
  }

  private initGlobalState() {
    this.globalState.global = {
      showMessageTopPreview: false,
      messagePreviewUsrId: '',
      messagePreviewMessage: '',
      messagePreviewTimer: null,
      hideFilter: false,
      hideGlobalTab: false,
      clickedGlobalTab: '01',
      tabFlickerOn: true
    };

    this.globalState.foreground = true;

    this.globalState.isuLastTrdPrc = {};
    this.globalState.APP_VERSION = APP_VERSION;
  }

  private async initPlugins() {
    // region window alert 수정
    if (navigator['notification']) {
      // @ts-ignore
      alert = (msg, title) => {
        navigator['notification'].alert(msg, null, title || '알림', '확인');
      };
    }
    // endregion

    // region 캡쳐방지 실행 // 아이폰은 없음
    if (this.platform.is('android')) {
      if ((<any>window).OurCodeWorldpreventscreenshots) {
        (<any>window).OurCodeWorldpreventscreenshots.disable(/*successCallback(), failCallback()*/);
      }
    }
    // endregion

    // region 뱃지 사용가능여부 및 권한획득
    this.badge.hasPermission().then(granted => {
      if (!granted) {
        this.badge.requestPermission().then(v => {
          console.log('뱃지 퍼미션 획득여부', v);
        });
      }
    });
    // endregion

    // region 네트워크 상태 확인
    if (!navigator.onLine) {
      alert('현재 접속 환경이 불안정하여 서비스를 계속 이용하실 수 없습니다.');

      if (this.platform.is('android')) {
        setTimeout(() => {
          this.nos.quit();
        }, 0);
      } else {
        setTimeout(() => {
          this.platform.exitApp();
        });
      }
    }

    // 인터넷이 끊긴 경우 처리
    this.network.onDisconnect().subscribe(() => {
      let modal = this.modalCtrl.getModal('networkError', {
        errorType: 'networkError'
      });

      // 전역에 현재 열린 모달 저장
      // $rootScope.networkOfflineModal
      this.globalState.networkOfflineModal = modal;
      modal.present();
    });

    // 인터넷이 연결된 경우 처리
    this.network.onConnect().subscribe(() => {
      // 연결되면 자동으로 닫기
      if (this.globalState.networkOfflineModal) {
        this.globalState.networkOfflineModal.dismiss();
      }
    });
    // endregion

    // region nos 가동
    const nosResult = await this.nos.check();
    if (!nosResult) {
      alert('NOS 보안 프로그램 설치 오류로 종료 됩니다');
      this.nos.quit();
    }
    // endregion

    // Fido 초기화
    this.fido.init();

    // 앱실드 실행
    if (!await this.checkAppShield()) {
      this.nos.quit();
    }
  }

  // TODO 채팅방 이동
  goTalkRoom(roomId) {

  }

  // Device pause, resume 이벤트 초기화
  private initDeviceEvent() {
    this.pause$ = this.platform.pause.subscribe(() => {
      this.globalState.foreground = false;
      // TODO: websocket 닫기
    });

    this.resume$ = this.platform.resume.subscribe(() => {
      if (this.platform.is('cordova')) {
        this.checkAppVersion.check();

        this.fido.init();
      }

      this.globalState.foreground = true;

      this.globalState.runLogoutInterval();

      this.storage.get('gcm_token').then(token => {
        this.websocket.open(token);
      });

      // TODO: websocket 열기

      // TODO: 현재 페이지가 채팅방 리스트일 경우 처리
    });
  }

  //아이콘 클릭시
  doClick(index) {
    for (let i = 0; i < this.menuTree.length; i++) {
      this.menuTree[i].active = false;
    }

    this.menuTree[index].active = true;

    const activeMenu = this.menuTree[index];

    if (activeMenu.title === '주문제출') {
      console.log('주문제출 페이지 이동');
      this.goToPage(OrderSubmitPage);
    }

    this.activeMenu = activeMenu;
  }

  // 메뉴 depth2 클릭시 해당 페이지로 이동
  goToPage(component: any) {
    this.nav.setRoot(component).then(() => {
      this.menuCtrl.close();
    });
  }

  // URL 열림
  openURL(item) {
    if (item.page) {
      this.nav.setPages([this.rootPage, item.page]).then(() => {
        this.menuCtrl.close();
      });
      return;
    }
    this.util.openURL(item.url);
  }

  // 화면 전환 페이지 이벤트 감지
  // provider에서는 navCtrl을 써서 화면전환을 할 수 없다.
  // 따라서 이벤트를 통해 화면전환을 시킨다.
  initMovePageEvent() {
    this.events.subscribe('nav.setRoot', (pageName, param) => {
      this.nav.setRoot(this.checkPageName(pageName), {data: param}, this.util.animation.forward);
    });

    this.events.subscribe('nav.push', (pageName, param) => {
      this.nav.push(this.checkPageName(pageName), {data: param});
    });

    this.events.subscribe('nav.stay', () => {
      console.log('현재 페이지 유지');
    });
  }

  private checkPageName(pageName) {
    let page;
    if (pageName === 'CertCenterPage') {
      page = CertCenterPage;
    } else if (pageName === 'HomePage') {
      page = HomePage;
    } else if (pageName === 'PincodeAndFingerSettingPage') {
      page = PincodeAndFingerSettingPage;
    } else {
      console.log('페이지 잘못 입력');
      page = HomePage;
    }
    return page;
  }
}

