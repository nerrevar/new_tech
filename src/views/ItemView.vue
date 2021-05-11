<template>
  <Suspense>
    <template #default>
      <ItemPage
        :id="id"
      />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import ItemPage from '@/components/ItemPage.vue'

export default defineComponent({
  name: 'ItemView',
  components: {
    ItemPage,
  },
  setup () {
    const route = useRoute()

    const id = route.params.itemId

    return {
      id,
    }
  },
})
</script>
