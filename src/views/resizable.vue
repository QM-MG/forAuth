<template>
    <div>
        <div class="helloword">
            <div class="text-event">
             <vue-draggable-resizable :w="100" :h="100" v-on:dragging="onDrag" v-on:resizing="onResize" :parent="true">
      <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
    </vue-draggable-resizable>
            </div>
        </div>
    </div>
</template>
<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
export default {
    data() {
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        };
    },
    mounted() {
    },
    components: {
        VueDraggableResizable
    },
    methods: {
        onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    }
    }
};
</script>

<style lang="less">
</style>





