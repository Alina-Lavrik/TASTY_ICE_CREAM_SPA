import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from '../reducers/productsSlice';

// Компонент избранного (полная страница)
const FavoritesPage = () => {
    const dispatch = useDispatch();
    const { items, favorites } = useSelector(state => state.products);
    const favItems = items.filter(item => favorites.includes(item.id));

    const handleRemoveFromFavorites = (item) => {
        dispatch(removeFromFavorites(item));   
    };

    return (
        <div className="sidebar-card size">
            <h3>❤️ Избранное <span>{favItems.length}</span></h3>
            {favItems.length === 0 ? (
                <div className="empty-message">Нет избранных</div>) : (
                    <table className="fav-table">
                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Стоимость</th>
                                <th>Удалить</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favItems.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="sidebar-item">
                                        <span className="name">
                                <img src={item.image} alt={item.name} className="mini-image" />{item.name}
                                </span>    
                                        </div>    
                                    </td>  
                                    <td>
                                    <span className="price">{item.price} ₽</span>
                                    </td>
                                    <td>
                                       <button className="remove-btn" onClick={() => handleRemoveFromFavorites(item.id)}>✕</button> 
                                    </td>
                            </tr>
                        ))}
                        </tbody>           
                    </table>
                )}
        </div>
    );
};

export default FavoritesPage;