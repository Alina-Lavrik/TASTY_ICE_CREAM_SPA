import { initialProducts } from '../utils/data';
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
        name: 'products',
        initialState: {
            items: initialProducts,
            cart: [],
            favorites: [],
        },
        reducers: {
            setAmount: (state, action) => {
                const { productId, newAmount } = action.payload;
                const product = state.items.find(item => item.id === productId);
                if (product) {
                    const safeAmount = Number.isFinite(newAmount) ? Math.max(1, Math.floor(newAmount)) : 1;
                    product.amountToBuy = safeAmount;
                }
            },
            addToCart: (state, action) => {
                const id = action.payload;
                const product = state.items.find(item => item.id === id);
                if (product && product.amountToBuy > 0 && !state.cart.includes(id)) {
                    state.cart.push(id);
                }
            },
            removeFromCart: (state, action) => {
                const id = action.payload;
                state.cart = state.cart.filter(itemId => itemId !== id);
                const product = state.items.find(item => item.id === id);
                if (product) {
                    product.amountToBuy = 1;
                }
            },
            addToFavorites: (state, action) => {
                const id = action.payload;
                if (!state.favorites.includes(id)) {
                    state.favorites.push(id);
                }
            },
            removeFromFavorites: (state, action) => {
                const id = action.payload;
                state.favorites = state.favorites.filter(favoriteId => favoriteId !== id);
            },
            decreaseQuantity: (state, action) => {
                const id = action.payload;
                const product = state.items.find(item => item.id === id);
                if (!product) return;
                
                if (state.cart.includes(id) && product.amountToBuy === 1) {
                    state.cart = state.cart.filter(itemId => itemId !== id);
                    product.amountToBuy = 1;
                } else if (product.amountToBuy > 1) {
                    product.amountToBuy -= 1;
                }
            },
            increaseQuantity: (state, action) => {
                const id = action.payload;
                const product = state.items.find(item => item.id === id);
                if (product) {
                    product.amountToBuy = Math.max(1, product.amountToBuy + 1);
                }
            },
            clearCart: (state) => {
                state.cart.forEach(id => {
                    const product = state.items.find(item => item.id === id);
                    if (product) {
                        product.amountToBuy = 1;
                    }
                });
                state.cart = [];
            },
        },
    });

export const { setAmount, addToCart, removeFromCart, addToFavorites, removeFromFavorites, decreaseQuantity, increaseQuantity, clearCart } = productsSlice.actions;

export default productsSlice.reducer;