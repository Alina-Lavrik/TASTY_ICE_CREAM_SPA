import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, removeFromFavorites } from '../reducers/productsSlice';
import { Link } from 'react-router-dom';
import tasty_ice_woman from '../images/tasty_ice_woman.jpg' 


const Sidebar = () => {
    const dispatch = useDispatch();
    const { cart, favorites, items } = useSelector(state => state.products);
    const cartItems = items.filter(item => cart.includes(item.id));
    const totalItems = cartItems.reduce((sum, item) => sum + item.amountToBuy, 0);
    const totalCart = cartItems.reduce((sum, item) => sum + item.price * item.amountToBuy, 0);
    const favItems = items.filter(item => favorites.includes(item.id));
    
    const handleRemoveFromCart = (item) => {
            dispatch(removeFromCart(item));   
    };

    const handleRemoveFromFavorites = (item) => {
            dispatch(removeFromFavorites(item));   
    };

        return (
            <div className="sidebar">
                <div className="sidebar-card">
                    <h3>🛒 Корзина <span>{totalItems}</span></h3>
                    {cartItems.length === 0 && <div className="empty-message">Корзина пуста</div>}
                    {cartItems.map(item => (
                        <div className="sidebar-item line" key={item.id}>
                            <span className="name">
                                <img src={item.image} alt={item.name} className="mini-image" />
                                {item.name} × {item.amountToBuy}
                            </span>
                            <span className="price">{item.price * item.amountToBuy} ₽</span>
                            <button className="remove-btn" onClick={() => handleRemoveFromCart(item.id)}>✕</button>
                        </div>
                    ))}
                    {cartItems.length > 0 && (
                        <>
                        <div className="total-row">
                            <span>Итого</span>
                            <span>{totalCart} ₽</span>
                        </div>
                        <Link to="/cart" style={{ textDecoration: 'none' }}>
                                <button className="btn-buy">
                                    💳 Перейти к покупке
                                </button>
                        </Link>     
                        </>
                    )}
                </div>
                <div className="sidebar-card">
                    <h3>❤️ Избранное <span>{favItems.length}</span></h3>
                    {favItems.length === 0 && <div className="empty-message">Нет избранных</div>}
                    {favItems.map(item => (
                        <div className="sidebar-item line" key={item.id}>
                            <span className="name">
                                <img src={item.image} alt={item.name} className="mini-image" />
                                {item.name}
                            </span>
                            <span className="price">{item.price} ₽</span>
                            <button className="remove-btn" onClick={() => handleRemoveFromFavorites(item.id)}>✕</button>
                        </div>
                    ))}
                </div>
                <div className="sidebar-card"><img className="tasty_ice_woman" src={tasty_ice_woman} alt="woman_image"/></div>
            </div>
        );
    };

export default Sidebar;