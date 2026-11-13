import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";


const HomePage = () => {
    return (
        <div className="app-grid">
            <div>
                <ProductList />
            </div>
            <Sidebar />
        </div>
    );
};

export default HomePage;
 
