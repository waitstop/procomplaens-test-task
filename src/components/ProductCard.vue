<template>
  <div class="product-card">
    <div class="image-holder">
      <button v-show="this.product.state" @click="deleteProduct">&CircleTimes;</button>
    </div>
    <div class="title-price-row">
      <p :style="{textDecoration: this.product.state ? 'none':'line-through'}">
        {{ this.product.title }}
      </p>
      <span>${{ this.product.price }}</span>
    </div>
    <span class="product-description">{{ this.product.description }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {store, Product} from "@/store";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },
  data(){
    return{
      productImage: `url(${this.product.thumbnail})`,
    }
  },
  computed: {
    productImageOpacity(): string {
      return this.product.state ? "10%" : "70%";
    }
  },
  methods:{
    deleteProduct(){
      store.commit('deleteProduct', this.product.id)
    }
  },
  updated: () => ({
    products: store.getters.productsSortedByAvailability
  })
})
</script>

<style lang="scss" scoped>
.product-card{
  flex-basis: calc(33% - 2rem);
  margin-inline: auto;
  .image-holder{
    background: v-bind(productImage) no-repeat center;
    background-size: cover;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    &:before{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      background-color: black;
      opacity: v-bind(productImageOpacity);
      content: '';
    }
    button{
      z-index: 2;
      position: absolute;
      right: .25rem;
      top: .25rem;
      cursor: pointer;
      color: tomato;
      font-size: 2rem;
      background: none;
      outline: none;
      border: none;
      transition: color .1s linear;
      &:hover{
        color: darkred;
      }
    }
  }
  .title-price-row{
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    font-weight: bold;
    span{
      background: lightgreen;
      padding: .25rem .5rem;
      color: #fff;
      border-radius: 1rem;
    }
  }
}
</style>