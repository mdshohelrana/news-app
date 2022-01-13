<template>
  <div class="mb-4">
    <v-card class="mx-auto rounded-lg">
      <v-spacer></v-spacer>
      <action-toolbar :article="article" @editNews="editNews" />
      <v-img :src="article.urlToImage || emptyNewsImg" height="250px" />
      <v-card-subtitle class="pb-0 mt-2 caption">
        <span class="subtitle-1">{{ article.publishedAt | fromNowAgo }}</span>
      </v-card-subtitle>
      <router-link :to="`/details/${article.id}`">
        <v-card-title
          class="pt-0"
          :class="article.visited ? 'purple--text' : 'dark--text'"
        >
          {{ article.title }}
        </v-card-title>
      </router-link>
      <v-card-text>
        {{ article.description }}
        <v-btn height="14" class="indigo--text text-capitalize px-0" plain>
          <router-link :to="`/details/${article.id}`" class="read-more"
            >Read More</router-link
          >
        </v-btn>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit News Headline</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newsTitle"
                  label="Headline*"
                  :rules="rules"
                  counter="180"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeEditNews">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveNewsTitle"
            :disabled="newsTitle.length > 180"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ActionToolbar from "./ActionToolbar.vue";
const emptyNewsImg = require("../assets/images/empty-news.jpg");

export default {
  components: { ActionToolbar },
  props: {
    article: {
      type: Object,
    },
  },

  data() {
    return {
      emptyNewsImg,
      dialog: false,
      oldTitle: "",
      newsTitle: "",
      rules: [(v) => v.length <= 180 || "Max 180 characters"],
    };
  },
  methods: {
    editNews(title) {
      this.dialog = true;
      this.newsTitle = title;
      this.oldTitle = title;
    },
    saveNewsTitle() {
      this.$store.commit("news/updateNewsTitle", {
        id: this.oldTitle,
        data: this.newsTitle,
      });
      this.closeEditNews();
    },

    closeEditNews() {
      this.dialog = false;
      this.newsTitle = "";
      this.oldTitle = "";
    },
  },
};
</script>
