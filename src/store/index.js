import { createStore } from 'vuex';
import sampleData from '@/assets/sampleData.json';
export const store = createStore({
    state: () => ({
        products: sampleData.products,
        lastId: sampleData.products.length
    }),
    getters: {
        productsSortedByAvailability(state) {
            return state.products.sort((a, b) => {
                return (a.state === b.state) ? 0 : a.state ? -1 : 1;
            });
        },
        lastId(state) {
            return state.lastId;
        }
    },
    mutations: {
        addProduct(state, newProduct) {
            state.products.unshift(newProduct);
        },
        deleteProduct(state, id) {
            for (const product of state.products) {
                if (product.id == id)
                    product.state = false;
            }
        },
        incrementId(state) {
            state.lastId++;
        }
    }
});
store.subscribe((_mutation, state) => {
    sessionStorage.setItem('store', JSON.stringify(state));
});
const savedState = sessionStorage.getItem('store');
if (savedState !== null) {
    store.replaceState(JSON.parse(savedState));
}
//# sourceMappingURL=index.js.map