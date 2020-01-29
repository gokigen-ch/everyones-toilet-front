<template>
  <div>
    <main class="room">
        <section class="room-wall" v-on:click="showFukidashi">
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
  data: function () {
    return {
      rakugakiNum: 0
    }
  },
  methods: {
    showFukidashi: function(e){
      console.log(e)

      //一つ前の落書きフォームが残っていたら削除する
      if(document.getElementById("rakugaki_form_" + this.rakugakiNum ) != null){
        document.getElementById("rakugaki_form_" + this.rakugakiNum ).remove();
      }
      if(document.getElementById("fukidashi") != null){
        document.getElementById("fukidashi").remove();
      }

      var roomWall = document.getElementsByClassName("room-wall")[0]
      
      //スマホ用に縦スクロール対応する
      var offsetY = e.offsetY + roomWall.scrollTop
      //room-wallは横スクロール対応しているため、scrollLeftを足している。（縦スクロールは対応していない。）
      var offsetX = e.offsetX + roomWall.scrollLeft
      console.log("offsetY=" + offsetY)
      console.log("offsetX=" + offsetX)

      // フォームを追加する
      this.rakugakiNum++;
      var form = document.createElement("form")
      form.id = "rakugaki_form_" + this.rakugakiNum
      roomWall.appendChild(form)
      var input = document.createElement("input")
      input.type = "text"
      input.id = "rakugaki_input_" + this.rakugakiNum
      form.appendChild(input)

      // フォームの位置を調整する
      form.style.position = "absolute"
      form.style.top = (Number(offsetY) - 0 ) + "px"
      form.style.left = (Number(offsetX) - 8 ) + "px"

      // 吹き出しを追加する
      var fukidashi = document.createElement("div")
      fukidashi.id = "fukidashi"
      fukidashi.style.position = "absolute"
      fukidashi.style.top = (Number(offsetY) - 40) + "px"
      fukidashi.style.left = (Number(offsetX) - 8) + "px"
      fukidashi.setAttribute(this.$options._scopeId ,null)
      // コード汚いので後で修正したい
      fukidashi.insertAdjacentHTML('afterbegin','落書きできるよ〜<span ' + this.$options._scopeId + '></span>')
      roomWall.appendChild(fukidashi)

      console.log('rakugaki_input_' + this.rakugakiNum)
      var newRakugakiInput = document.getElementById('rakugaki_input_' + this.rakugakiNum)
      console.log(newRakugakiInput)

      // 新しく表示した入力フォームにフォーカスをあてる
      newRakugakiInput.focus()

    }
  },
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

#fukidashi {
  position: relative;
  padding: 0 8px;
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
