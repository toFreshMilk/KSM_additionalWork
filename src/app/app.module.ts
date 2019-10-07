import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/KSM-A-01/home/home';
import { CheckAppVersionProvider } from '../providers/check-app-version/check-app-version';
import { FidoProvider } from '../providers/fido/fido';
import { NosProvider } from '../providers/nos/nos';
import { KeypadProvider } from '../providers/keypad/keypad';
import { ComponentsModule } from '../components/components.module';
import { PopupProvider } from '../providers/popup/popup';
import { CompanyDetailPage } from '../pages/KSM-A-01/company-detail/company-detail';
import { DangerNotifyPage } from '../pages/KSM-A-01/danger-notify/danger-notify';
import { HowToTradePage } from '../pages/KSM-A-01/how-to-trade/how-to-trade';
import { MemberCompanyPage } from '../pages/KSM-A-01/member-company/member-company';
import { NoticePage } from '../pages/KSM-A-01/notice/notice';
import { SummaryPage } from '../pages/KSM-A-01/summary/summary';
import { AllStockStatusPage } from '../pages/KSM-A-02/all-stock-status/all-stock-status';
import { NegotiationAuthPage } from '../pages/KSM-A-02/negotiation-auth/negotiation-auth';
import { NegotiationChatPage } from '../pages/KSM-A-02/negotiation-chat/negotiation-chat';
import { StockStatusPage } from '../pages/KSM-A-02/stock-status/stock-status';
import { OrderSheetPage } from '../pages/KSM-A-03/order-sheet/order-sheet';
import { OrderSubmitPage } from '../pages/KSM-A-03/order-submit/order-submit';
import { AllStockConclusionStatusPage } from '../pages/KSM-A-04/all-stock-conclusion-status/all-stock-conclusion-status';
import { DailyStockConclusionStatusPage } from '../pages/KSM-A-04/daily-stock-conclusion-status/daily-stock-conclusion-status';
import { ConclusionHistoryPage } from '../pages/KSM-A-06/conclusion-history/conclusion-history';
import { DeleteUserPage } from '../pages/KSM-A-06/delete-user/delete-user';
import { FavoritesPage } from '../pages/KSM-A-06/favorites/favorites';
import { ModifyAccountInfoPage } from '../pages/KSM-A-06/modify-account-info/modify-account-info';
import { ModifyUserinfoPage } from '../pages/KSM-A-06/modify-userinfo/modify-userinfo';
import { MypagePage } from '../pages/KSM-A-06/mypage/mypage';
import { NegotiationListPage } from '../pages/KSM-A-06/negotiation-list/negotiation-list';
import { OrderSubmitListPage } from '../pages/KSM-A-06/order-submit-list/order-submit-list';
import { PincodeSettingsPage } from '../pages/KSM-A-06/pincode-settings/pincode-settings';
import { PushHistoryPage } from '../pages/KSM-A-06/push-history/push-history';
import { SecondAuthSettingPage } from '../pages/KSM-A-06/second-auth-setting/second-auth-setting';
import { AcceptTermsPage } from '../pages/KSM-A-08/accept-terms/accept-terms';
import { IdentificationPage } from '../pages/KSM-A-08/identification/identification';
import { InputUserinfoPage } from '../pages/KSM-A-08/input-userinfo/input-userinfo';
import { RequireSecondAuthNotifyPage } from '../pages/KSM-A-08/require-second-auth-notify/require-second-auth-notify';
import { AppShieldProvider } from '../providers/app-shield/app-shield';
import { GlobalStateProvider } from '../providers/global-state/global-state';
import { Device } from '@ionic-native/device';
import { CryptoProvider } from '../providers/crypto/crypto';
import { StockCodeProvider } from '../providers/stock-code/stock-code';
import { IonicStorageModule } from '@ionic/storage';
import { CertProvider } from '../providers/cert/cert';
import { DBProvider } from '../providers/db/db';
import { SQLite } from '@ionic-native/sqlite';
import { ModalProvider } from '../providers/modal/modal';
import { UtilProvider } from '../providers/util/util';
import { Network } from '@ionic-native/network';
import { CertCenterPage } from "../pages/KSM-A-10/cert-center/cert-center";
import { FcmProvider } from '../providers/fcm/fcm';
import { FCM } from '@ionic-native/fcm';
import { RenewalCertPage } from "../pages/KSM-A-10/renewal-cert/renewal-cert";
import { WebsocketProvider } from '../providers/websocket/websocket';
import { Vibration } from '@ionic-native/vibration';
import { HttpProvider } from '../providers/http/http';
import { OperateNoticePage } from "../pages/KSM-A-02/operate-notice/operate-notice";
import { KsmNewsPage } from "../pages/KSM-A-02/ksm-news/ksm-news";
import { DeleteCertPage } from "../pages/KSM-A-10/delete-cert/delete-cert";
import { PincodeAndFingerSettingPage } from "../pages/KSM-A-10/pincode-and-finger-setting/pincode-and-finger-setting";
import { ClausePage } from '../pages/COMMON/clause/clause';
import { HttpClientModule } from 'ngx-http-client';
import { ReissueInputUserinfoPage } from "../pages/KSM-A-09/reissue-input-userinfo/reissue-input-userinfo";
import { ReissueAcceptTermsPage } from "../pages/KSM-A-09/reissue-accept-terms/reissue-accept-terms";
import { ReissueAccountAndPasswordPage } from "../pages/KSM-A-09/reissue-account-and-password/reissue-account-and-password";
import { HTTP } from '@ionic-native/http';
import { DirectivesModule } from '../directives/directives.module';
import { LogoutProvider } from '../providers/logout/logout';
import { RelatedRuleCloudFundingPage } from "../pages/KSM-A-01/related-rule-cloud-funding/related-rule-cloud-funding";
import { FavoritesDetailPage } from "../pages/KSM-A-06/favorites-detail/favorites-detail";
import { CommonProvider } from '../providers/common/common';
import { Badge } from '@ionic-native/badge';

const PAGE_LIST = [
  // KSM-A-01
  CompanyDetailPage,
  DangerNotifyPage,
  HomePage,
  HowToTradePage,
  MemberCompanyPage,
  NoticePage,
  SummaryPage,
  RelatedRuleCloudFundingPage,

  // KSM-A-02
  AllStockStatusPage,
  NegotiationAuthPage,
  NegotiationChatPage,
  StockStatusPage,
  OperateNoticePage,
  KsmNewsPage,

  // KSM-A-03
  OrderSheetPage,
  OrderSubmitPage,

  // KSM-A-04
  AllStockConclusionStatusPage,
  DailyStockConclusionStatusPage,

  // KSM-A-06
  ConclusionHistoryPage,
  DeleteUserPage,
  FavoritesPage,
  ModifyAccountInfoPage,
  ModifyUserinfoPage,
  MypagePage,
  NegotiationListPage,
  OrderSubmitListPage,
  PincodeSettingsPage,
  PushHistoryPage,
  SecondAuthSettingPage,
  FavoritesDetailPage,

  // KSM-A-08
  AcceptTermsPage,
  IdentificationPage,
  InputUserinfoPage,
  RequireSecondAuthNotifyPage,

  // KSM-A-09
  ReissueInputUserinfoPage,
  ReissueAcceptTermsPage,
  ReissueAccountAndPasswordPage,

  // KSM-A-10
  CertCenterPage,
  RenewalCertPage,
  DeleteCertPage,
  PincodeAndFingerSettingPage,

  // Common
  ClausePage
];
const NATIVE_PLUGIN_LIST = [
  Device,         // 기기정보 조회
  SQLite,         // DB
  StatusBar,      // 화면 상단 status bar
  SplashScreen,   // 앱 스플래시 스크린
  Network,        // 네트워크
  FCM,            // Firebase Cloud Message
  Vibration,      // 진동
  HTTP,           // CORS 방지 네이티브 HTTP 통신
  Badge           // 앱 뱃지
];

const CUSTOM_PROVIDER_LIST = [
  CheckAppVersionProvider,      // 앱 최신버전 체크
  FidoProvider,                 // Fido 플러그인
  NosProvider,                  // Nos 플러그인
  KeypadProvider,               // Keypad 플러그인
  PopupProvider,                // 공통 팝업 관리
  AppShieldProvider,            // AppShield 플러그인
  GlobalStateProvider,          // 전역 상태 저장 공유
  CryptoProvider,               // 암호화
  StockCodeProvider,            // Stock Code 처리
  DBProvider,                   // DB 처리 관련
  CertProvider,                 // 공인인증 관련
  ModalProvider,                // 모달 관리
  UtilProvider,                 // 유틸
  FcmProvider,                  // Push 관련
  WebsocketProvider,            // 웹소켓
  HttpProvider,                 // HTTP client wrapper
  LogoutProvider,               // 로그아웃 관련
  CommonProvider                // 공통부분 처리
];

@NgModule({
  declarations: [
    MyApp,
    ...PAGE_LIST
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md',
      backButtonText: '',
      pageTransition: 'ios-transition'
    }),
    IonicStorageModule.forRoot({
      name: 'localStorage',
      driverOrder: ['websql', 'indexeddb', 'sqlite']
    }),
    HttpClientModule,
    ComponentsModule,
    DirectivesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ...PAGE_LIST
  ],
  providers: [
    ...NATIVE_PLUGIN_LIST,
    ...CUSTOM_PROVIDER_LIST,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
