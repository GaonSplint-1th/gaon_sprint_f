import { useRef, useState, type PointerEvent, type ReactNode } from 'react';
import * as s from '../Home/style.css';

/** 삭제 버튼이 드러나는 폭(px). */
const REVEAL_WIDTH = 72;
/** 이만큼 넘게 끌면 열린 상태로 붙는다. */
const OPEN_THRESHOLD = REVEAL_WIDTH / 2;
/** 세로로 이만큼 움직이면 스크롤로 보고 스와이프를 포기한다. */
const VERTICAL_SLOP = 12;

interface SwipeToDeleteProps {
  children: ReactNode;
  disabled?: boolean;
  onDelete: () => void;
  /** 스크린리더용 이름. 예) "아침 메뉴 삭제" */
  deleteLabel: string;
}

/**
 * 옆으로 밀면 삭제 버튼이 나오는 행 (시안 "옆으로 스와이프 시 삭제버튼 도출").
 *
 * 포인터 이벤트로 처리해 터치와 마우스를 함께 받는다.
 * 세로로 먼저 움직이면 목록 스크롤이라고 보고 스와이프를 포기한다.
 */
const SwipeToDelete = ({
  children,
  disabled,
  onDelete,
  deleteLabel,
}: SwipeToDeleteProps) => {
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{ x: number; y: number; base: number } | null>(null);
  const axis = useRef<'none' | 'x' | 'y'>('none');

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    start.current = { x: event.clientX, y: event.clientY, base: offset };
    axis.current = 'none';
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const origin = start.current;
    if (!origin) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;

    if (axis.current === 'none') {
      if (Math.abs(dy) > VERTICAL_SLOP && Math.abs(dy) > Math.abs(dx)) {
        axis.current = 'y';
        start.current = null;
        return;
      }
      if (Math.abs(dx) < 6) return;
      axis.current = 'x';
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    // 왼쪽으로만 열리고, 버튼 폭보다 더 끌리지 않는다.
    setOffset(Math.max(-REVEAL_WIDTH, Math.min(0, origin.base + dx)));
  };

  const endDrag = () => {
    if (!dragging && axis.current !== 'x') {
      start.current = null;
      return;
    }
    setDragging(false);
    setOffset((current) => (current < -OPEN_THRESHOLD ? -REVEAL_WIDTH : 0));
    start.current = null;
    axis.current = 'none';
  };

  return (
    <div className={s.swipeRow}>
      <button
        type="button"
        className={s.swipeDelete}
        aria-label={deleteLabel}
        tabIndex={offset === 0 ? -1 : 0}
        onClick={() => {
          setOffset(0);
          onDelete();
        }}
      >
        삭제
      </button>
      <div
        className={`${s.swipeCard} ${dragging ? s.swipeCardDragging : ''}`}
        style={{ width: `calc(100% + ${offset}px)` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {children}
      </div>
    </div>
  );
};

export default SwipeToDelete;
