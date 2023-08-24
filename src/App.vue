<template>
  <div class="products-container" v-auto-animate="{duration: 500}">
      <ProductCard v-for="product in products"
                   :product="product"
                   :key="product.id"
      />
  </div>
  <AddProductModal/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProductCard from "@/components/ProductCard.vue";
import AddProductModal from "@/components/AddProductModal.vue";
import {store} from "@/store";

export default defineComponent({
  name: 'App',
  components: {
    ProductCard,
    AddProductModal
  },
  data: () => ({
    products: store.getters.productsSortedByAvailability
  })
})
</script>

<style>
.products-container{
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  flex-grow: 1;
  padding: 5rem;
}
</style>
