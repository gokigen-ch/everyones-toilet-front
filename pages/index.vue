<template>
  <div class="container">
    <header>
      <h1>
        <img src="~/assets/image/logo-everyones-toilet.png" alt="みんなのトイレ" />
      </h1>
    </header>
    <main>
      <ul class="everyones-toilet">
        <li class="toilet01">
          <img src="~/assets/image/toilet-close-used.png" alt="個室1" />
        </li>
        <li class="toilet02"><a href="" id="toilet2"></a></li>
        <li class="toilet03"><a href=""></a></li>
        <li class="toilet04"><img src="~/assets/image/toilet-close-used.png" alt="個室4"></li>
        <li class="toilet05"><img src="~/assets/image/malfunction.png" alt="個室5"></li>
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

<style>
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
  background: url(~assets/image/toilet-close.png) no-repeat ;
  padding-bottom: 12px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.everyones-toilet li a:hover,
.everyones-toilet li a:focus {
  background-image: url(~assets/image/toilet-open.png);
}
</style>
