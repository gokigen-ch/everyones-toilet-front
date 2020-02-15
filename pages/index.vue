<template>
  <div>
    <header>
      <h1>
        <img src="/images/logo-everyones-toilet.png" alt="みんなのトイレ" />
      </h1>
    </header>
    <main>
      <ul class="everyones-toilet">
        <li class="toilet01">
          <img src="/images/toilet-close-used.png" alt="個室1" />
        </li>
        <li class="toilet02"><nuxt-link to="/rooms/2" id="toilet2"></nuxt-link></li>
        <li class="toilet03"><nuxt-link to="/rooms/3" id="toilet3"></nuxt-link></li>
        <li class="toilet04"><img src="/images/toilet-close-used.png" alt="個室4"></li>
        <li class="toilet05"><img src="/images/malfunction.png" alt="個室5"></li>
      </ul>
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
/* トップページ */
.everyones-toilet {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
}
.everyones-toilet li {
  width: 20%;
  padding: 0 12px;
}
.everyones-toilet li img {
  display: block;
  padding-bottom: 12px;
}
.everyones-toilet li a {
  display: block;
  height: 100%;
  background: url(/images/toilet-close.png) no-repeat ;
  padding-bottom: 12px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.everyones-toilet li a:hover,
.everyones-toilet li a:focus {
  background-image: url(/images/toilet-open.png);
}

@media all and (max-width: 980px) {
  .everyones-toilet li a {
    background-size: 100%;
  }
}

</style>
