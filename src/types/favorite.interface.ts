/** 즐겨찾기 항목 (dish 가 아니라 weekly_menu 템플릿 기준). */
export interface FavoriteMenuItem {
  weeklyMenuId: number;
  name: string;
  highlight: string | null;
  imageUrl: string | null;
}

/** 즐겨찾기 목록 응답. */
export interface FavoriteMenus {
  userId: string;
  items: FavoriteMenuItem[];
}

/** 즐겨찾기 등록 요청. */
export interface FavoriteMenuAddRequest {
  weeklyMenuId: number;
}

/** 즐겨찾기 등록 응답. */
export interface FavoriteMenuAdded {
  userId: string;
  weeklyMenuId: number;
  savedAt: string;
}
