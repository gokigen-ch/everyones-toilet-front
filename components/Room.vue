<template>
  <div>
    <main class="room">
      <section class="room-wall" @click="showRakugakiForm" @addRakugaki="test">
        <rakugaki-form v-if="rakugakiFormShow" :top="rakugakiFormTop" :left="rakugakiFormLeft" @addRakugaki="addRakugaki"></rakugaki-form>
      </section>
      <section class="room-floor">
        <img class="paper" v-if="paperImg" :src="paperImg" :alt="paperAlt">
        <img class="toilet" v-if="toiletImg" :src="toiletImg" :alt="toiletAlt">
        <div class="room-floor-btn-area">
          <a class="sns-btn active-btn"
              :href="twitterShareHref"
              onclick="window.open(this.href, 'tweetwindow', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1'); return false;">
              トイレ報告
          </a>
          <nuxt-link to="/">トイレから出る</nuxt-link>
        </div>
      </section>
    </main>
    <footer>
        &copy;みんなのトイレ
    </footer>
  </div>
</template>
<script>
import Vue from 'vue'
import RakugakiForm from '@/components/RakugakiForm.vue'
import axios from 'axios'

export default {
  props: [ 'num' , 'paperImg' , 'toiletImg' ],
    computed: {
      paperAlt: function () {
        return this.num + '番目の個室のペーパーホルダー'
      },
      toiletAlt: function () {
        return this.num + '番目の個室のトイレ'
      },
      twitterShareHref: function(){
        return 'http://twitter.com/intent/tweet?text=' + this.num + '番目の個室に入りました%0a&hashtags=みんなのトイレ&url=https://everyones-toilet.tokyo'
      }
  },
  components: {
    RakugakiForm
  },
  data: function () {
    return {
      rakugakiFormTop: 0,
      rakugakiFormLeft: 0,
      rakugakiFormShow: false
    }
  },
  methods: {
    showRakugakiForm: function(e){
      console.log(e)
      // 落書きの上に落書きしようとした時などはフォームを出さない（e.offsetYやe.offsetXの値がうまく取れないから）
      if(e.target.className !== 'room-wall'){
        console.log('落書きの上に落書きできない')
        // TODO: エラー表示したい
        return
      }
      // TODO: ここのコードがダサい
      var roomWall = document.getElementsByClassName("room-wall")[0]
      
      //スマホ用に縦スクロール対応する
      this.rakugakiFormTop = e.offsetY + roomWall.scrollTop
      //room-wallは横スクロール対応しているため、scrollLeftを足している。（縦スクロールは対応していない。）
      this.rakugakiFormLeft = e.offsetX + roomWall.scrollLeft

      if(this.rakugakiFormShow != true){
        this.rakugakiFormShow = true
      }
    },
    addRakugaki: function(text,top,left){
      console.log('addRakugaki')
        this.rakugakiFormShow = false

      let p = document.createElement('p');
      p.style.position = 'absolute'
      p.style.top = top + 'px'
      p.style.left = left + 'px'
      p.textContent = text

      // TODO: ここのコードがダサい
      var roomWall = document.getElementsByClassName("room-wall")[0]
      roomWall.appendChild(p)
    },
    test: function(){
      console.log('test')
    }
  },
  // TODO: asyncDataにしたいけど動かないからしかたなくmountedで書いてみる
  mounted : async function(){
    try {
      const { data } = await axios.get(process.env.BASE_URL + "/api/graffitis")          
      console.log('response data', data)
      data.forEach(d => {
        this.addRakugaki(d.text,d.position_y,d.position_x)
      })
    }
    catch( error){
      console.log("response error", error)
    }
  }
}
</script>
<style scoped>

/* 個室 */
.room-wall {
  position: relative;
  max-width: 800px;
  height: 420px;
  margin: 0 auto;
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
