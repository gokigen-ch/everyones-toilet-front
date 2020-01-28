<template>
<div>
    <main class="room">
        <section class="room-wall">
        </section>
        <section class="room-floor">
            <img class="paper" src="~/assets/image/paper03.png" alt="2番目の個室のペーパーホルダー">
            <img class="toilet" src="~/assets/image/toilet03.png" alt="2番目の個室のトイレ">
            <div class="room-floor-btn-area">
                <a class="sns-btn active-btn"
                    href="http://twitter.com/intent/tweet?text=2番目の個室に入りました%0a&hashtags=みんなのトイレ&url=https://everyones-toilet.tokyo"
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

#fukidashi{
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
