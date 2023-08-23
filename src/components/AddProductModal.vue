<template>
  <div v-show="modalState" class="add-product-modal">
    <h2>Добавить товар</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="product.title" required type="text" placeholder="Название товара">
      <input v-model="product.price" required type="number" placeholder="Цена товара ($)">
      <textarea v-model="product.description" placeholder="Описание товара"/>
      <input @change="handleFileUpload($event.target.files[0])" type="file" accept=".png,.jpg,.jpeg">
      <button type="submit">Добавить товар</button>
    </form>
    <button @click="() => modalState = false">&CircleTimes;</button>
  </div>
  <div @click="()=>modalState = true" v-show="!modalState" class="toggle-modal">&plus;</div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {store, Product} from "@/store";

export default defineComponent({
  methods: {
    handleSubmit(){
      store.commit('addProduct', {
        ...this.product,
        id: store.getters.lastId + 1,
        state: true
      })
      store.commit('incrementId')
    },
    handleFileUpload(file: File){
      if(!file) return
      const fr = new FileReader()
      fr.onload = () => {
        if (typeof(fr.result) != "string") return
        this.product.thumbnail = fr.result
      }
      fr.readAsDataURL(file)
      console.log(fr.result)
    }
  },
  data:()=>({
    modalState: false,
    product: <Product>{}
  })
})
</script>

<style lang="scss" scoped>
  .toggle-modal{
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    font-size: 5rem;
    cursor: pointer;
    background: whitesmoke;
    color: lightgreen;
    padding: 1rem;
    border: 2px solid lightgreen;
    border-radius: 100%;
    line-height: 50px;
    transition: all 0.1s linear;
    &:hover{
      background: ghostwhite;
      color: #79c979;
      border-color: #79c979;
    }
  }
  .add-product-modal{
    border-radius: 1rem;
    padding: 2rem 2rem;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.95);
    color: white;
    position: fixed;
    form{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 1rem;
      button{
        background: white;
        font-weight: bold;
        font-size: 1.1rem;
        border: none;
        border-radius: 1rem;
        outline: none;
        padding: .5rem 1rem;
        width: 100%;
      }
    }
    & > button{
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
    input, textarea{
      font-family: "Roboto", sans-serif;
      outline: none;
      width: 100%;
      box-sizing: border-box;
      border: none;
      border-radius: .25rem;
    }
    input:not([type="file"]), textarea{
      padding: .5rem 1rem;
    }
    input[type="file"]{
      cursor: pointer;
      &::-webkit-file-upload-button{
        border-radius: 1rem;
        cursor: pointer;
        background: white;
        outline: none;
        border: none;
        padding: 0.5rem 1rem;
      }
    }
  }
</style>