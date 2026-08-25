export interface IconProps {
  /** 아이콘 한 변의 픽셀 크기. 기본 24px. */
  size?: number;
  /**
   * 아이콘 색상. 기본값 `currentColor` — 부모의 `color` 를 따라간다.
   * 색은 되도록 감싸는 요소의 CSS `color` 로 지정하고 이 prop 은 예외적으로만 쓴다.
   */
  color?: string;
  className?: string;
}
