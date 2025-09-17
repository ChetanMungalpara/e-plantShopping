import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
        numOfItems: 0 // Number of items multiplied by their quantity
    },

    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);

            if (existingItem) {
                // In existing items, quantity is already added as property
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }

            state.numOfItems += 1;
        },

        removeItem: (state, action) => {
            const itemName = action.payload;
            const itemToRemove = state.items.find(item => item.name === itemName);

            if (itemToRemove) {
                state.items = state.items.filter(item => item.name !== itemName);
            }
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const existingItem = state.items.find(item => item.name === name);

            if (existingItem) {
                const differenceQuantity = quantity - existingItem.quantity;
                state.numOfItems += differenceQuantity;
                existingItem.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
