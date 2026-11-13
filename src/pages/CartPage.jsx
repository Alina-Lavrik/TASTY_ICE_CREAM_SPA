import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { removeFromCart, decreaseQuantity, increaseQuantity, clearCart } from '../reducers/productsSlice';
import { recordPurchase } from '../utils/purchases';
import { Notification } from '../components/Notification';

// Компонент корзины (полная страница)

const CartPage = () => {
    const dispatch = useDispatch();
    const { items, cart } = useSelector(state => state.products);
    const [notification, setNotification] = useState(null);
    const cartItems = items.filter(item => cart.includes(item.id));
    const totalCart = cartItems.reduce((sum, item) => sum + item.price * item.amountToBuy, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.amountToBuy, 0);

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));   
    };

    const handleBuy = () => {
        if (cartItems.length === 0) return;
        recordPurchase(cartItems);

        setNotification(`✅ Покупка оформлена! ${totalItems} шт на ${totalCart} ₽`);
        setTimeout(() => setNotification(null), 3000);
        // Очищаем корзину
        dispatch(clearCart());
        };

    if (cartItems.length === 0) {
        return (
            <>
            <Notification message={notification} />
            <div className="sidebar-card size">
                <h3>🛒 Корзина <span>0</span></h3>
                <div className="empty-message">Корзина пуста</div>
            </div>
            </>
        );
    }
    return (
        <div className="sidebar-card size">
            <Notification message={notification} />
            <h3>🛒 Корзина <span>{totalItems}</span></h3>
            <div className="stats-table-wrap">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Количество</th>
                                <th>Сумма</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="product-cell">
                                        <img src={item.image} alt={item.name} className="product-image-small" />
                                        <span className="product-name-cell">{item.name}</span> 
                                    </div>
                                </td>
                                <td>
                                    <div className="qty-control">
                                        <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                                        <span>{item.amountToBuy}</span>
                                        <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                                    </div>
                                </td>
                                <td>
                                    {item.price * item.amountToBuy} ₽
                                </td>
                                <td>
                                    <button 
                                        className="remove-btn" 
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        title="Удалить товар"
                                    >
                                            ✕
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <strong>Итого: </strong></td>
                                <td>
                                    <div className="total-items"><strong> {totalItems} шт</strong></div>
                                </td>
                            <td><strong>{totalCart} ₽</strong></td>
                            <td></td>
                            </tr>
                        </tfoot>
                    </table>
            </div>
            <button className="btn-buy" onClick={handleBuy}>
                    💳 Купить ({totalItems} шт · {totalCart} ₽)
            </button>
        </div>
    );
};
    
export default CartPage;

