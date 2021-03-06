import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App.vue';

Vue.use(VueMaterial);

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red'
  },
  green: {
    primary: 'green',
    accent: 'pink'
  },
  orange: {
    primary: 'orange',
    accent: 'green'
  },
})

new Vue({
  el: '#app',
  render: h => h(App)
});
