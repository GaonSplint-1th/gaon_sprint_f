import { style } from '@vanilla-extract/css';
import { flex, theme } from '@/styles';

/*
 * 크기와 모서리(borderRadius)는 쓰는 쪽 className 이 정한다.
 * 여기서 기본값을 두면 같은 명시도끼리 부딪혀 스타일시트 순서에 따라 결과가 달라진다.
 */
export const box = style([
  flex.CENTER,
  {
    position: 'relative',
    overflow: 'hidden',
    background: theme.neutral[200],
    color: theme.textTertiary,
  },
]);

/*
 * 흐름에서 빼내 절대 배치한다.
 * 흐름 안에 두면 사진의 원본 비율대로 박스가 늘어나, 세로가 긴 사진을 만난 카드만
 * 혼자 커진다. 절대 배치하면 박스 높이는 바깥에서 정한 값으로 고정되고,
 * 사진은 objectFit: cover 로 그 안에 잘려 들어간다.
 */
export const image = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
