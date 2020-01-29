<template>
  <div id="rakugaki_form" :style="styles">
    <div id="fukidashi">落書きできるよ〜<span></span></div>
    <input id="rakugaki_input" type="text" v-model="value" @keypress.enter.prevent="keypress" @blur="blur">
  </div>
</template>
<script>
export default {
  props: {
    parent: {
      type: Element,
      require: true
    },
    top :{
      type: Number,
      require: true
    },
    left :{
      type: Number,
      require: true
    }
  },
  data: function() {
    return {
      value: this.text
    };
  },
  computed: {
    styles () {
      return {
        '--top': this.top + 'px',
        '--left': this.left + 'px'
      }
    }
  },
  mounted: function() {
    this.parent.appendChild(this.$el);
    this.$nextTick(() => {
      document.getElementById('rakugaki_input').focus();
    });
  },
  methods: {
    keypress: function() {
      this.$emit("change", this.value);
      // this.$destroy();
    },
    blur: function() {
      // this.$destroy();
    }
  },
  destroyed: function() {
    this.$el.remove();
  }  
}
</script>
<style scoped>

#rakugaki_form{
  --top: 0;
  --left: 0;
  position: absolute;
  top: var(--top);
  left: var(--left);
}

#fukidashi {
  position: relative;
  padding: 0 8px;
  margin-bottom: 8px;
  height: 30px;
  background: #f7dee6;
  border-radius: 4px;
  line-height: 30px;
}

#fukidashi span {
  position: absolute;
  bottom: -4px;
  width: 8px;
  height: 8px;
  display: block;
  background: #f7dee6;
  transform: rotate(45deg);
}

input[type="text"] {
  position: relative;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.5);
  outline: none;
  padding: 4px 8px;
}
</style>