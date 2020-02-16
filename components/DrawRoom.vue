<template>
  <div>
    <div class="canvas-parent" id="canvasParent">
      <canvas id="canvas"></canvas>
    </div>
    <main class="room">
      <button id="clear-button">全消し</button>
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
      rakugakiForm: {
        top: 0,
        left: 0,
        show: false
      },
      rakugakis:[],
      drawpoint:[],
      // マウスがドラッグされているか(クリックされたままか)判断するためのフラグ
      isDrag: false,
      context: null,
      lastPosition: null,
      canvas: null
    }
  },
  methods: {
    // 絵を書く
    draw(x, y) {
      // マウスがドラッグされていなかったら処理を中断する。
      // ドラッグしながらしか絵を書くことが出来ない。
      if(!this.isDrag) {
        return;
      }

      let from,to;

      // ドラッグの開始時
      if (this.lastPosition.x === null || this.lastPosition.y === null) {
        from = {
          x: x,
          y: y
        }
      // ドラッグ中
      } else {
        from = {
          x: this.lastPosition.x,
          y: this.lastPosition.y
        }
      }

      to = {
          x: x,
          y: y
      }

      this.drawpoint.push(
        {
          from,to
        }
      )
      // 現在のマウス位置を記録して、次回線を書くときの開始点に使う
      this.lastPosition.x = x;
      this.lastPosition.y = y;
    },
    // canvas上に書いた絵を全部消す
    clear() {
      this.drawpoint = []
    },
    dragStart(event) {
      this.isDrag = true;
    },
    dragEnd(event) {
      // 線を書く処理の終了を宣言する
      this.isDrag = false;
      // 描画中に記録していた値をリセットする
      this.lastPosition.x = null;
      this.lastPosition.y = null;
   },

  // マウス操作やボタンクリック時のイベント処理を定義する
  initEventHandler() {
    console.log("initEventHandler")
    const clearButton = document.querySelector('#clear-button');
    clearButton.addEventListener('click', this.clear);

    canvas.addEventListener('mousedown', this.dragStart);
    canvas.addEventListener('mouseup', this.dragEnd);
    canvas.addEventListener('mouseout', this.dragEnd);

    canvas.addEventListener('mousemove', (event) => {
      this.draw(event.offsetX , event.offsetY);
    });
  },
  frame_draw(){
    // 「context.beginPath()」と「context.closePath()」を都度draw関数内で実行するよりも、
    // 線の描き始め(dragStart関数)と線の描き終わり(dragEnd)で1回ずつ読んだほうがより綺麗に線画書ける
    this.context.beginPath()
    this.drawpoint.forEach((element) => {
      console.log("foreach")
      // this.context.lineCap = 'round'; // 丸みを帯びた線にする
      // this.context.lineJoin = 'round'; // 丸みを帯びた線にする
      // this.context.lineWidth = 5; // 線の太さ
      // this.context.strokeStyle = 'black'; // 線の色
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
        this.frame_draw();
    };
    setInterval(() => world(), 1000/FRAMERATE);

    // 直前のマウスのcanvas上のx座標とy座標を記録する
    this.lastPosition = { x: null, y: null };

    // イベント処理を初期化する
    this.initEventHandler();
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
