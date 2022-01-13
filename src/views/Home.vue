<template>
  <v-main class="grey lighten-3 mt-20">
    <v-container>
      <v-responsive class="flex mt-15 pt-10 mb-2">
        <h1 class="text-h3 text-lg-h2 font-weight-medium d-inline-block">
          News Headlines
        </h1>

        <v-btn
          @click="filterable = !filterable"
          absolute
          right
          class="right-arrow mt-3 white--text"
          color="indigo"
        >
          Filter
        </v-btn>
      </v-responsive>

      <h2 class="title">
        Latest articles from the world of tech news. Read what is happening with
        tech, sports and other area.
      </h2>

      <v-autocomplete
        v-if="filterable"
        v-model="sources"
        :items="newsSources"
        item-text="name"
        item-value="name"
        chips
        clearable
        deletable-chips
        dense
        multiple
      ></v-autocomplete>

      <template v-if="loading">
        <v-row class="mt-15">
          <v-col v-for="(n, i) in 8" :key="i" cols="12" lg="4" md="6">
            <v-skeleton-loader elevation="2" type="card" />
          </v-col>
        </v-row>
      </template>

      <template v-else>
        <div class="card-container mt-15">
          <articles
            v-for="(article, index) in filterableArticles"
            :key="index"
            :article="article"
          ></articles>
          <span
            border="right"
            color="blue-grey"
            dark
            v-if="filterableArticles.length == 0"
          >
            There is no top news headlines to show.
          </span>
        </div>
      </template>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import Articles from "../components/Articles.vue";

export default {
  name: "Home",
  components: {
    Articles,
  },

  data() {
    return {
      sources: [],
      filterable: false,
    };
  },

  computed: {
    ...mapState("news", ["topHeadlines", "loading", "newsSources"]),
    
    filterableArticles() {
      var filteredList = [];

      if (this.sources.length > 0) {
        filteredList = this.topHeadlines.articles.filter((el) => {
          return this.sources.some((f) => {
            return el.source.name === f;
          });
        });
      } else {
        filteredList = this.topHeadlines.articles;
      }

      return filteredList;
    },
  },
};
</script>

<style scoped>
.text-green input {
  color: green !important;
}

a {
  text-decoration: none;
  color: indigo !important;
}

.card-container {
  column-count: 4;
  column-gap: 1em;
  column-fill: balance;
}

@media (max-width: 1024px) {
  .card-container {
    column-count: 3;
    column-gap: 0.75em;
  }
}

@media (max-width: 768px) {
  .card-container {
    column-count: 2;
    column-gap: 0.5em;
  }
}

@media (max-width: 425px) {
  .card-container {
    column-count: 1;
  }
}

.card-container > * {
  display: inline-block;
  width: 100%;
}

.right-arrow {
  z-index: 5;
  right: 0;
}
</style>