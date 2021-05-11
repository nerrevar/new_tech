<template>
  <div
    class="toolbar"
    v-if="showToolbar"
  >
    <router-link to="/">
      <img
        class="logo"
        src="@/assets/img/logo.jpg"
        alt="logo"
      />
    </router-link>
  </div>
  <router-view />
  <router-link
    class="cart"
    v-if="showCart"
    to="/cart"
  >
    <div class="cart__image">
      <img src="@/assets/img/cart.png" alt="&#128722;" /><!--replace with unicode image-->
    </div>
    <div class="cart__border"></div>
    <div
      class="cart__count"
      v-if="countInCart !== 0"
    >
      <span>{{ countInCart }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Layout',
  setup () {
    const store = useStore()
    const router = useRouter()

    const countInCart = computed(() => store.state.countInCart)
    const showCart = computed(() => router.currentRoute.value.path !== '/cart')
    const showToolbar = computed(() => router.currentRoute.value.path !== '/')

    return {
      countInCart,
      showCart,
      showToolbar,
    }
  },
})
</script>

<style lang="sass" scoped>
.toolbar
  width: 100vw
  height: calc(36px + 1em)

  padding: 0.5em
  background-color: lightblue

.logo
  height: 36px
  object-fit: fill

$cart-size: 5rem

@keyframes pulse-border
  0%
    width: calc(#{$cart-size} - 0.5rem)
    height: calc(#{$cart-size} - 0.5rem)
    top: 0.25rem
    left: 0.25rem
  50%
    width: $cart-size
    height: $cart-size
    top: 0
    left: 0
  100%
    width: calc(#{$cart-size} - 0.5rem)
    height: calc(#{$cart-size} - 0.5rem)
    top: 0.25rem
    left: 0.25rem

.cart
  position: fixed
  left: calc(100vw - #{$cart-size} - 3em)
  top: calc(100vh - #{$cart-size} - 3em)
  width: $cart-size
  height: $cart-size

  cursor: pointer

  &__border
    position: absolute
    top: 0.25rem
    left: 0.25rem
    width: calc(#{$cart-size} - 0.5rem)
    height: calc(#{$cart-size} - 0.5rem)
    z-index: 101

    background-color: #F57F17
    border-radius: 50%

    animation-name: pulse-border
    animation-duration: 2s
    animation-fill-mode: forwards
    animation-timing-function: linear
    animation-iteration-count: infinite

  &__image
    position: absolute
    top: 0.5rem
    left: 0.5rem
    width: calc(#{$cart-size} - 1rem)
    height: calc(#{$cart-size} - 1rem)
    z-index: 102

    border-radius: 50%
    background-color: yellow

    & > img
      margin: 15%
      width: 70%
      height: 70%

      text-align: center
      font-size: calc(#{$cart-size} - 2rem)

  &__count
    position: absolute
    left: calc(#{$cart-size} - 1.5rem)
    top: calc(#{$cart-size} - 1.5rem)
    width: 1.2rem
    height: 1.2rem
    z-index: 103

    border-radius: 50%
    background-color: red
    color: wheat
    text-align: center
</style>
