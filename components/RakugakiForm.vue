<template>
  <form method="POST" class="rakugaki_form" :style="styles" @submit="submit">
    <div class="fukidashi">落書きできるよ〜<span></span></div>
    <input id="rakugaki_input" type="text" v-model="text">
  </form>
</template>
<script>
export default {
  props: {
    top :{
      type: Number,
      require: true
    },
    left :{
      type: Number,
      require: true
    },
    room :{
      type: Number,
      require: true
    }
  },
  data: function() {
    return {
      text: this.text
    };
  },
  computed: {
    styles () {
      return {
        'top': this.top  - 40 + 'px',
        'left': this.left - 8 + 'px'
      }
    }
  },
  mounted: function() {
    // TODO: かっこよく書きたい
    document.getElementById('rakugaki_input').focus()
  },

  updated: function() {
    // TODO: かっこよく書きたい
    document.getElementById('rakugaki_input').focus()
  },
  methods: {
    submit: async function(e) {
      e.preventDefault()

      // トイレの落書き表示に反映する
      this.$emit('addRakugaki', this.text, this.top , this.left)

      try {
        const response = await this.$axios.post(process.env.BASE_URL + `/api/rooms/${this.room}/graffitis`,
          {
            text: this.text,
            position_x: this.left,
            position_y: this.top,
            room: this.room
          }
        )        
        console.log('response data', response)
      }
      catch( error){
        console.log("response error", error)
      }
    }
  }  
}
</script>
<style scoped>

.rakugaki_form{
  position: absolute;
}

.fukidashi {
  position: relative;
  padding: 0 8px;
  margin-bottom: 8px;
  height: 30px;
  background: #f7dee6;
  border-radius: 4px;
  line-height: 30px;
}

.fukidashi span {
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