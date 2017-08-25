<template>
  <div class="app-viewport" id="application">
    <md-sidenav ref="sidebar" class="md-left md-fixed">
      <md-toolbar class="md-account-header">
        <md-list class="md-transparent">
          <md-list-item>
            <div class="md-list-text-container">
              <span>Giuseppe Menti</span>
              <span>mentifg@gmail.com</span>
            </div>
            <md-button class="md-icon-button md-list-action">
              <md-icon>arrow_drop_down</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </md-toolbar>
    </md-sidenav>

    <md-whiteframe md-elevation="3" class="main-toolbar">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <md-button class="md-icon-button" @click="openSideBar">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

        <div class="md-toolbar-container">
          <h2 class="md-title">Últimos tweets</h2>
        </div>
      </md-toolbar>
    </md-whiteframe>

    <main class="main-content">
      <md-list v-if="isBooted" class="md-double-line">
        <md-list-item v-for="tweet in tweets" :key="tweet.id">
          <md-avatar class="md-avatar-icon">
            <img :src="'https://files.coinmarketcap.com/static/img/coins/32x32/' + currencyService.getByTwitterId(tweet.twitterId)[0].name.toLowerCase() + '.png'" alt="Avatar">
          </md-avatar>

          <div class="md-list-text-container">
          <span>
            <template v-for="currency in currencyService.getByTwitterId(tweet.twitterId)">
              {{ currency.name + " " }}
            </template>
          </span>
            <span>{{ tweet.message }}</span>
            <p>{{ getTweetDate(tweet.createdAt) }}</p>
          </div>
        </md-list-item>
      </md-list>
      <div v-else>
        <md-layout md-align="center" md-gutter="80">
          <md-spinner :md-size="150" md-indeterminate></md-spinner>
        </md-layout>
      </div>
    </main>
  </div>
</template>

<script>
  import currencyService from './service/currencyService';
  import twitterService from './service/twitterService';
  import tweetService from './service/tweetService';

  export default {
    data () {
      return {
        currencyService,
        page: 0,
        twitters: twitterService.all(),
        currencies: currencyService.all(),
        tweets: [],
        fetchTweetsInterval: 30000,
      };
    },

    mounted() {
      this.getPaginatedTweets();

      setInterval(async () => {
        await this.getPaginatedTweets();
      }, this.fetchTweetsInterval);
    },

    methods: {
      openSideBar() {
        this.$refs.sidebar.open();
      },

      async getPaginatedTweets() {
        const pagination = await tweetService.paginated(this.page);
        this.tweets = pagination.content;
      },

      getTweetDate(createdAt) {
        const date = new Date(createdAt);

        if (date.getDay() === new Date().getDay()) {
          return date.toLocaleTimeString();
        }

        return date.toLocaleString();
      }
    },

    computed: {
      isBooted() {
        return this.twitters.length > 0 && this.currencies.length > 0;
      },
    },
  };
</script>

<style lang="sass">
  @import "~vue-material/dist/vue-material.css"

  html, body, .app-viewport
    height: 100%
    overflow: hidden

  .app-viewport
    display: flex
    flex-flow: column

  .main-toolbar
    position: relative
    z-index: 10

  .md-fab
    margin: 0
    position: absolute
    bottom: -20px
    left: 16px
    z-index: 10

    .md-icon
      color: #fff

  .md-title
    padding-left: 8px
    color: #fff

  .main-content
    position: relative
    z-index: 1
    overflow: auto

  .md-list-action .md-icon
    color: rgba(#000, .26)

  .md-avatar-icon .md-icon
    color: #fff !important

  .md-sidenav .md-list-text-container > :nth-child(2)
    color: rgba(#fff, .54)

  .md-account-header
    .md-list-item:hover .md-button:hover
      background-color: inherit

    .md-avatar-list .md-list-item-container:hover
      background: none !important

</style>
