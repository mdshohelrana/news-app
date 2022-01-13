<template>
  <v-main class="grey lighten-3">
    <v-container class="pt-15" v-if="article">
      <v-img
        :src="article.urlToImage || emptyNewsImg"
        class="white--text align-center"
        max-height="500"
        contain
      />
      <div class="mt-15 mx-auto">
        <h1 class="display-2 font-weight-medium">
          {{ article.title }}
        </h1>
        <h2 class="py-5 font-weight-regular">
          {{ article.description }}
        </h2>
        <p v-if="article.author" class="caption">
          <v-icon>{{ mdiAccountCircleOutline }}</v-icon> by {{ article.author }}
        </p>
      </div>
    </v-container>

    <v-container v-if="article">
      <div class="mx-auto mt-5">
        <p>
          {{ article.content }}
        </p>
      </div>
    </v-container>

    <v-container v-else>
      <div class="mx-auto mt-5">No details article</div>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import { mdiAccountCircleOutline } from "@mdi/js";
const emptyNewsImg = require("../assets/images/empty-news.jpg");

export default {
  data() {
    return {
      mdiAccountCircleOutline,
      emptyNewsImg,
    };
  },

  computed: {
    ...mapState("news", ["topHeadlines"]),

    article() {
      if (
        this.topHeadlines &&
        this.topHeadlines.articles &&
        this.topHeadlines.articles.length > 0
      ) {
        return this.topHeadlines.articles.filter((item) => {
          return item.id === +this.$route.params.id;
        })[0];
      } else {
        return null;
      }
    },
  },

  watch: {
    topHeadlines(data) {
      // if page is reload again
      if (data.articles) {
        this.setVisited();
      }
    },
  },

  mounted() {
    this.setVisited();
  },

  methods: {
    setVisited() {
      if (this.topHeadlines && this.topHeadlines.articles) {
        this.$store.commit("news/setVisisted", this.$route.params.id);
      }
    },
  },
};
</script>

 <style scoped>
.max-600 {
  max-width: 600px;
}
</style>