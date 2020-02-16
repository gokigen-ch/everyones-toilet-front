<template>
  <div>
      <draw-room :num="4"/>
  </div>
</template>
<script>
import DrawRoom from '@/components/DrawRoom.vue'
export default {
    components: {
        DrawRoom
    }
}
</script>