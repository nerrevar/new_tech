<template>
  <router-view />
  <div class="cart" v-bind="$attrs">
    <div class="cart__image">
      <img src="@/assets/img/cart.png" alt="&#128722;" /><!--replace with unicode image-->
    </div>
    <div class="cart__border"></div>
    <div
      class="cart__count"
      v-if="getCartCount !== 0"
    >
      <span>{{ getCartCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'Layout',
  computed: {
    getCartCount () {
      return 1
    }
  },
})
</script>

<style lang="sass" scoped>
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
  position: absolute
  right: 3rem
  bottom: 3rem
  width: $cart-size
  height: $cart-size

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
