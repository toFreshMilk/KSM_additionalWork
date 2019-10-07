import { SummaryPage } from '../pages/KSM-A-01/summary/summary';
import { HowToTradePage } from '../pages/KSM-A-01/how-to-trade/how-to-trade';
import { DangerNotifyPage } from '../pages/KSM-A-01/danger-notify/danger-notify';
import { NoticePage } from '../pages/KSM-A-01/notice/notice';
import { MemberCompanyPage } from '../pages/KSM-A-01/member-company/member-company';
import { AllStockStatusPage } from '../pages/KSM-A-02/all-stock-status/all-stock-status';
import { StockStatusPage } from '../pages/KSM-A-02/stock-status/stock-status';
import { AllStockConclusionStatusPage } from '../pages/KSM-A-04/all-stock-conclusion-status/all-stock-conclusion-status';
import { DailyStockConclusionStatusPage } from '../pages/KSM-A-04/daily-stock-conclusion-status/daily-stock-conclusion-status';
import { MypagePage } from '../pages/KSM-A-06/mypage/mypage';
import { ModifyUserinfoPage } from '../pages/KSM-A-06/modify-userinfo/modify-userinfo';
import { NegotiationListPage } from '../pages/KSM-A-06/negotiation-list/negotiation-list';
import { ConclusionHistoryPage } from '../pages/KSM-A-06/conclusion-history/conclusion-history';
import { OrderSubmitListPage } from '../pages/KSM-A-06/order-submit-list/order-submit-list';
import { ModifyAccountInfoPage } from '../pages/KSM-A-06/modify-account-info/modify-account-info';
import { FavoritesPage } from '../pages/KSM-A-06/favorites/favorites';
import { OrderSubmitPage } from '../pages/KSM-A-03/order-submit/order-submit';
import { KsmNewsPage } from "../pages/KSM-A-02/ksm-news/ksm-news";
import { OperateNoticePage } from "../pages/KSM-A-02/operate-notice/operate-notice";

export interface SideMenuInterface {
  depth: number;
  active?: boolean;
  title: string;
  class?: string;
  component?: any
  child?: SideMenuInterface[];
}

export const SIDE_MENU: SideMenuInterface[] = [
  {
    depth: 1,
    active: false,
    title: 'KSM안내',
    'class': 'ksmIntro',
    child: [
      {depth: 2, title: 'ㆍKSM 개요', component: SummaryPage},
      {depth: 2, title: 'ㆍ매매방법', component: HowToTradePage},
      {depth: 2, title: 'ㆍ위험고지', component: DangerNotifyPage},
      {depth: 2, title: 'ㆍ공지사항', component: NoticePage},
      {depth: 2, title: 'ㆍ참여증권회사', component: MemberCompanyPage},
      {depth: 2, title: ''}
    ]
  }, {
    depth: 1,
    active: true,
    title: 'KSM정보',
    'class': 'ksmInfo',
    child: [
      {depth: 2, title: 'ㆍ전종목현황', component: AllStockStatusPage},
      {depth: 2, title: 'ㆍ종목별현황', component: StockStatusPage},
      {depth: 2, title: 'ㆍKSM뉴스', component: KsmNewsPage},
      {depth: 2, title: 'ㆍ운영공지', component: OperateNoticePage}
    ]
  }, {
    depth: 1,
    active: false,
    title: '주문제출',
    'class': 'ksmOrderSubmit',
    child: []
  }, {
    depth: 1,
    active: false,
    title: '체결정보',
    'class': 'tradeInfo',
    child: [
      {depth: 2, title: 'ㆍ전종목체결현황', component: AllStockConclusionStatusPage},
      {depth: 2, title: 'ㆍ일별종목별체결현황', component: DailyStockConclusionStatusPage}
    ]
  }
];

export interface DropdownMenuInterface {
  id: string;
  title: string;
  children: Array<{
    id: string;
    title: string;
    component?: any;
  }>
}

export const DROPDOWN_MENU: DropdownMenuInterface[] = [
  {
    id: '01',
    title: 'KSM안내',
    children: [
      {id: '0101', title: 'KSM 개요', component: SummaryPage},
      {id: '0102', title: '매매방법', component: HowToTradePage},
      {id: '0104', title: '위험고지', component: DangerNotifyPage},
      {id: '0105', title: '공지사항', component: NoticePage},
      {id: '0106', title: '참여증권회사', component: MemberCompanyPage}
    ]
  },
  {
    id: '02',
    title: 'KSM정보',    // 시장정보
    children: [
      {id: '0201', title: '전종목현황', component: AllStockStatusPage},
      {id: '0202', title: '종목별현황', component: StockStatusPage},
      {id: '0203', title: 'KSM뉴스', component: KsmNewsPage},
      {id: '0204', title: '운영공지', component: OperateNoticePage}
    ]
  },
  {
    id: '03',
    title: '주문제출',
    children: [
      {id: '0301', title: '주문제출', component: OrderSubmitPage}
    ]
  },
  {
    id: '04',
    title: '체결정보',
    children: [
      {id: '0401', title: '전종목체결현황', component: AllStockConclusionStatusPage},
      {id: '0402', title: '일별종목별체결현황', component: DailyStockConclusionStatusPage}
    ]
  },
  {
    id: '05',
    title: '코넥스상장안내',
    children: [
      {id: '0501', title: '상장절차'},
      {id: '0502', title: '특례상장'},
      {id: '0503', title: '교육자료'},
      {id: '0504', title: '참여마당'},
      {id: '0505', title: '상장사례'},
      {id: '0506', title: '통계정보'},
      {id: '0507', title: '홍보마당'}
    ]
  },
  {
    id: '06',
    title: 'Mypage',
    children: [
      {id: '0600', title: '전체', component: MypagePage},
      {id: '0601', title: '회원정보', component: ModifyUserinfoPage},
      {id: '0602', title: '협상목록', component: NegotiationListPage},
      {id: '0603', title: '체결내역', component: ConclusionHistoryPage},
      {id: '0604', title: '주문내역', component: OrderSubmitListPage},
      {id: '0605', title: '계좌정보', component: ModifyAccountInfoPage},
      {id: '0606', title: '관심종목', component: FavoritesPage}
    ]
  }
];
