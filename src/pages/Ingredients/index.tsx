import { useMemo, useState } from 'react';
import type { CartItem, Ingredient } from '@/types';
import { MOCK_INGREDIENTS } from './mock';
import * as s from './style.css';

const IngredientsPage = () => {
  // TODO: 장바구니 상태는 임시로 로컬 state 사용 (추후 전역 store/서버 연동)
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Ingredient) => {
    setCart((prev) => {
      const found = prev.find((c) => c.id === item.id);
      if (found) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const changeQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0),
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const total = useMemo(
    () => cart.reduce((sum, c) => sum + c.price * c.quantity, 0),
    [cart],
  );

  return (
    <div className={s.container}>
      <div>
        <h1 className={s.title}>식재료 구매</h1>
        <p className={s.desc}>
          담고 싶은 식재료를 장바구니에 추가하세요. (임시 목업 데이터)
        </p>
      </div>

      <div className={s.layout}>
        {/* 식재료 목록 */}
        <ul className={s.list}>
          {MOCK_INGREDIENTS.map((item) => (
            <li key={item.id} className={s.row}>
              <div className={s.rowInfo}>
                <span className={s.name}>{item.name}</span>
                <span className={s.unit}>{item.unit}</span>
              </div>
              <div className={s.qtyBox}>
                <span className={s.price}>{item.price.toLocaleString()}원</span>
                <button className={s.addBtn} onClick={() => addToCart(item)}>
                  담기
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* 장바구니 */}
        <aside className={s.cart}>
          <h2 className={s.cartTitle}>장바구니 ({cart.length})</h2>

          {cart.length === 0 ? (
            <p className={s.empty}>담긴 식재료가 없습니다.</p>
          ) : (
            <>
              {cart.map((c) => (
                <div key={c.id} className={s.cartRow}>
                  <span className={s.cartName}>{c.name}</span>
                  <div className={s.qtyBox}>
                    <button
                      className={s.iconBtn}
                      onClick={() => changeQuantity(c.id, -1)}
                    >
                      −
                    </button>
                    <span className={s.qtyText}>{c.quantity}</span>
                    <button
                      className={s.iconBtn}
                      onClick={() => changeQuantity(c.id, 1)}
                    >
                      +
                    </button>
                    <button
                      className={s.removeBtn}
                      onClick={() => removeFromCart(c.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}

              <div className={s.divider} />

              <div className={s.total}>
                <span>합계</span>
                <span>{total.toLocaleString()}원</span>
              </div>
            </>
          )}

          <button className={s.checkoutBtn} disabled={cart.length === 0}>
            주문하기
          </button>
        </aside>
      </div>
    </div>
  );
};

export default IngredientsPage;
