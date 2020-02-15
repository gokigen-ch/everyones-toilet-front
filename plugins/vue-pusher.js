import Vue from 'vue'
Vue.use(require('vue-pusher'), {
    api_key: process.env.PUSHER_KEY,
    options: {
        cluster: 'ap3',
        encrypted: true,
    }
});