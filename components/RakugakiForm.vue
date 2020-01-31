<template>
  <form method="POST" class="rakugaki_form" :style="styles" @submit="submit">
    <div class="fukidashi">落書きできるよ〜<span></span></div>
    <input id="rakugaki_input" type="text" v-model="text">
  </form>
</template>
<script>
import axios from 'axios'
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
    this.parent.appendChild(this.$el)
    this.$nextTick(() => {
      // TODO:document全体から探すのではなくて、このコンポーネントの中から探したい
      document.getElementById('rakugaki_input').focus()
    });
  },
  methods: {
    submit: async function(e) {
      e.preventDefault()

      // トイレの落書き表示に反映する
      // TODO: emitでイベントを親(Room)に渡して、親でappendChildをしてもらいたい。
      // 軽くやってうまくいかなかったからいったん諦める。ちゃんとRoomと親子関係になれていないのかもしれない
      // this.$emit('addRakugaki', this.text, this.top , this.left)
      var p = document.createElement('p');
      p.style.position = 'absolute'
      p.style.top = this.top + 'px'
      p.style.left = this.left + 'px'
      p.textContent = this.text
      this.parent.appendChild(p)

      // axios.postの待ち時間が思ったより長いので、先に表示だけ消しておく
      this.$el.style.display = "none"

      try {
        const response = await axios.post(process.env.BASE_URL + "/api/graffitis",
          {
            text: this.text,
            position_x: this.left,
            position_y: this.top
          }
        )        
        console.log('response data', response)
      }
      catch( error){
        console.log("response error", error)
      }

      this.$destroy();
    }
  },
  destroyed: function() {
    this.$el.remove();
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