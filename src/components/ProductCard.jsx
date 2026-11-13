import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, addToCart, removeFromFavorites, addToFavorites, increaseQuantity } from '../reducers/productsSlice';

 // Компонент карточки товара
const ProductCard = ({ product }) => {
        const dispatch = useDispatch();
        const isInCart = useSelector(state => state.products.cart.includes(product.id));
        const isFav = useSelector(state => state.products.favorites.includes(product.id));

        const handleQtyChange = (delta) => {
            if (delta === -1) {
                dispatch(decreaseQuantity(product.id));
            } else {
                dispatch(increaseQuantity(product.id));
            }
        };

        const handleAddToCart = () => {
            if (!isInCart && product.amountToBuy > 0) {
                dispatch(addToCart(product.id));
            }
        };

        const toggleFavorite = () => {
            if (isFav) {
                dispatch(removeFromFavorites(product.id));
            } else {
                dispatch(addToFavorites(product.id));
            }
        };

        return (
            <div className="product-card">
                <div className="product-image-wrapper">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-image"
                        loading="lazy"
                    />
                </div>
                <div className="product-name">{product.name}</div>
                <div className="product-desc">{product.description}</div>
                <div className="product-price">{product.price} ₽</div>
                <div className="product-actions">
                    <div className="qty-control">
                        <button 
                            onClick={() => handleQtyChange(-1)} disabled={product.amountToBuy <= 1 && !isInCart}>
                            −
                        </button>
                        <span>{product.amountToBuy}</span>
                        <button onClick={() => handleQtyChange(1)}>+</button>
                    </div>
                    <button className={`btn-icon ${isFav ? 'fav-active' : 'fav'}`} onClick={toggleFavorite}>
                        {isFav ? '❤️' : '🤍'}
                    </button>
                    <button 
                        className="btn-cart" onClick={handleAddToCart} disabled={isInCart || product.amountToBuy <= 0}>
                        {isInCart ? 'В корзине' : 'В корзину'}
                    </button>
                </div>
            </div>
        );
};
    
export default ProductCard;

