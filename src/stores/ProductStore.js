import { defineStore } from 'pinia';

export const useProductStore = defineStore( 'products',{

state: () => ({
    products: []
}),
actions: {
    addProduct(product) {
        this.products.push(product);
    },
    removeProduct(index) {
        this.products.splice(index, 1);
    },
    getProduct(id) {
        return this.products.find(product => product.id === id);
    },
    nextId() {
    return productStore.products.length > 0 
      ? Math.max(...productStore.products.map(product => product.id)) + 1
      : 1;
  }
}
});
