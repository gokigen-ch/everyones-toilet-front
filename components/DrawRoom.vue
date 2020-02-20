<template>
  <div>
    <div class="canvas-parent" id="canvasParent">
      <canvas id="canvas" @mousedown="press" @touchstart="press" 
                          @mousemove="move" @touchmove="move"
                          @mouseup="dragEnd" @mouseout="dragEnd" @touchend="dragEnd" @touchcancel="dragEnd"></canvas>
    </div>
    <main class="room">
      <input type="radio" id="modeFree" name="mode" value="free" v-model="mode" checked>
      <label for="modeFree">フリーハンド</label>
      <input type="radio" id="modeLine" name="mode" value="line" v-model="mode">
      <label for="modeLine">直線</label>
      <button id="clear-button" @click="clear">全消し</button>
    </main>
    <footer>
        &copy;みんなのトイレ
    </footer>
  </div>
</template>
<script>
import Vue from 'vue'

export default {
  props: {
    num :{
      type: Number,
      require: true
    }
  },
  computed: {
    paperAlt: function () {
      return this.num + '番目の個室のペーパーホルダー'
    },
    toiletAlt: function () {
      return this.num + '番目の個室のトイレ'
    },
    twitterShareHref: function(){
      return 'http://twitter.com/intent/tweet?text=' + this.num + '番目の個室に入りました%0a&hashtags=みんなのトイレ&url=https://everyones-toilet.tokyo'
    },
  },
  data: function () {
    return {
      drawpoint:[],
      // マウスがドラッグされているか(クリックされたままか)判断するためのフラグ
      isDrag: false,
      lastPosition: null,
      lastLinePosition: null,
      context: null,
      canvas: null,
      mode: 'free'
    }
  },
  methods: {
    chanageMode(mode){
      this.mode = mode
    },
    getPoint(event){
      console.log(event.type)
      console.log(event)
        if( (event.type === 'mousemove') || (event.type === 'mousedown')){
          console.log({
            x: event.offsetX,
            y: event.offsetY 
          })
          return {
            x: event.offsetX,
            y: event.offsetY 
          } 
        }
        else if((event.type === 'touchmove') || (event.type === 'touchstart') ){
          let x,y
          if (event.touches && event.touches[0]) {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
          } else if (event.originalEvent && event.originalEvent.changedTouches[0]) {
            x = event.originalEvent.changedTouches[0].clientX;
            y = event.originalEvent.changedTouches[0].clientY;
          } else if (event.clientX && event.clientY) {
            x = event.clientX;
            y = event.clientY;
          }
          return { x,y }
        }
        else{
          console.log("move event error")
          throw "move event error"
        }
    },
    move(event) {
      // スマホのときにスクロールするのを防ぐ
      event.preventDefault()

      if(this.mode === 'free'){
        if(!this.isDrag) {
          return
        }

        let to = this.getPoint(event)
        let from = this.lastPosition === null ? to : this.lastPosition
        this.drawpoint.push({from,to})

        // 現在のマウス位置を記録して、次回線を書くときの開始点に使う
        this.lastPosition = to
      }
      else if(this.mode === 'line'){
        if(this.lastLinePosition === null) {
          return
        }

        console.log('line move')
        const to = this.getPoint(event)
        const from = this.lastLinePosition
        this.drawpoint[this.drawpoint.length - 1] = { to, from }
        console.log(this.drawpoint[this.drawpoint.length - 1])
      }
    },
    // canvas上に書いた絵を全部消す
    clear() {
      this.drawpoint = []
    },
    press(event) {
      this.isDrag = true
      if(this.mode === 'line'){
        if( this.lastLinePosition === null ){
          this.lastLinePosition = this.getPoint(event)
          this.drawpoint.push({from: this.lastLinePosition,to :this.lastLinePosition})
          console.log(this.drawpoint[this.drawpoint.length - 1])
        }
        else{
          console.log('line to point =' + this.getPoint(event) )
          this.drawpoint[this.drawpoint.length - 1] =
          {
            to: this.getPoint(event),
            from: this.lastLinePosition
          }
          this.lastLinePosition = null
        }
      }
    },
    dragEnd(event) {
      // 線を書く処理の終了を宣言する
      this.isDrag = false
      // 描画中に記録していた値をリセットする
      this.lastPosition = null
   },
    draw(){
      // 「context.beginPath()」と「context.closePath()」を都度draw関数内で実行するよりも、
      // 線の描き始め(press関数)と線の描き終わり(dragEnd)で1回ずつ読んだほうがより綺麗に線画書ける
      this.context.beginPath()
      this.drawpoint.forEach((element) => {
        this.context.moveTo(element.from.x, element.from.y)
        this.context.lineTo(element.to.x, element.to.y)
        this.context.stroke()
      })
      this.context.closePath()
    },
    resize(){
      let canvasParent = document.getElementById("canvasParent");
      this.canvas.width = canvasParent.clientWidth;
      this.canvas.height = canvasParent.clientHeight;
    },
  },
  // TODO: asyncDataにしたいけど動かないからしかたなくmountedで書いてみる
  mounted : function(){
    // canvasのレスポンシブ対応
    const FRAMERATE = 60;
    let canvasParent = document.getElementById("canvasParent");
    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext('2d');

    this.context.lineCap = 'round'; // 丸みを帯びた線にする
    this.context.lineJoin = 'round'; // 丸みを帯びた線にする
    this.context.lineWidth = 5; // 線の太さ
    this.context.strokeStyle = 'black'; // 線の色

    let world = () => {
        this.resize();
        this.draw();
    };
    setInterval(() => world(), 1000/FRAMERATE);
  }
}
</script>
<style scoped>

/* 個室 */
.canvas-parent {
  position: relative;
  margin: 0 auto;
  max-width: 800px;
  height: 420px;
  border:solid;
  white-space:nowrap;
  overflow: scroll;
}

.room-floor {
  position: relative;
  width: 100%;
}

.room-floor .toilet {
  position: absolute;
  left:50%;
  top: -20px;
  margin-left: -138px;
}

.room-floor .paper {
  position: absolute;
  left:50%;
  top: -80px;
  margin-left: -100px;
}

.room-floor-btn-area {
  position: absolute;
  right: 12px;
  bottom:12px;
}
.room-floor-btn-area a {
  display: block;
  margin-bottom: 8px;
  padding: 12px;
  border: 4px solid #191919;
  background: #fff;
}
.room-floor-btn-area a:last-child {
  margin-bottom: 0px;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #fff;
  font-size: 13px;
  background-color: #191919;
  line-height: 40px;
}
</style>
