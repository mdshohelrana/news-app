<template>
  <div id="app">
    <v-app id="news">
      <v-app-bar app color="indigo" flat>
        <v-container class="py-0 fill-height">
          <router-link to="/" class="router-link">
            <v-avatar color="white" size="45">N</v-avatar>
          </router-link>
          <v-btn
            class="text-capitalize headline white--text"
            to="/"
            v-for="link in links"
            :key="link"
            text
            plain
            style="text-decoration: none"
          >
            {{ link }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-responsive max-width="260">
            <v-text-field
              v-model.trim="searchText"
              @keyup="search()"
              class="white"
              dense
              flat
              hide-details
              rounded
              solo-inverted
            ></v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  data() {
    return {
      searchText: "",
      links: ["News"],
    };
  },

  created() {
    this.$store.dispatch("news/getTopHeadlines");
    this.$store.dispatch("news/getNewsSources");
  },

  methods: {
    search: debounce(function () {
      if (this.searchText.length > 0) {
        this.$store.dispatch("news/getSearchedTopHeadlines", this.searchText);
      } else {
        this.$store.dispatch("news/getTopHeadlines");
      }
    }, 500),
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router-link {
  text-decoration: none;
}

.v-application a {
  color: #000000 !important;
  text-decoration: none;
}

.v-application .read-more {
  color: #000000 !important;
  font-weight: bold;
}

.v-application a:hover {
  text-decoration: underline;
  cursor: pointer;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1440px;
  }
}
</style>