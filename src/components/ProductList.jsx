import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

// Компонент списка товаров

const ProductList = () => {
    const products = useSelector(state => state.products.items);
        
    return (
        <>
         <h2 className="page-title">Ассортимент мороженого</h2>
            <div className="product-grid">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </>
    );
};

export default ProductList;