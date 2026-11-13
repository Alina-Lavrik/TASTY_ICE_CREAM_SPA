import { Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';   
import { getCurrentUser } from '../utils/auth';

const Navigation = () => {
    const location = useLocation();
    const { cart, favorites, items } = useSelector(state => state.products);
    const currentUser = getCurrentUser();

    const totalItemsInCart = cart.reduce((sum, id) => {
            const product = items.find(item => item.id === id);
            return sum + (product ? product.amountToBuy : 0);
        }, 0);

    return (
        <nav className="nav-bar">
            <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Главная</Link>
            <Link to='/stats' className={location.pathname === '/stats' ? 'active' : ''}>Статистика</Link>
            <Link to='/auth' className={location.pathname === '/auth' ? 'active' : ''}>
                    {currentUser ? '👤' : 'Войти'}
                </Link>
            <div className="nav-right">
                <Link to='/cart' className={location.pathname === '/cart' ? 'active' : ''}>🛒 Корзина {totalItemsInCart > 0 && (<span className="nav-badge">{totalItemsInCart}</span>)}</Link>
                <Link to='/favorites' className={location.pathname === '/favorites' ? 'active' : ''}>❤️ Избранное {favorites.length > 0 && (<span className="nav-badge">{favorites.length}</span>)}</Link>
            </div>
        </nav>
    );
};

export default Navigation;


