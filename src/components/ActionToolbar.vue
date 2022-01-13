<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          absolute
          fab
          plain
          right
          class="right-arrow"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color="indigo" size="28">{{ mdiArrowRight }}</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-btn plain class="text-capitalize">
              <router-link :to="`/details/${article.id}`"
                >Redirect Detail</router-link
              >
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-btn class="text-capitalize" plain @click="editNews(article.title)">
            Edit Headline
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mdiArrowRight } from "@mdi/js";

export default {
  props: {
    article: {
      type: Object,
    },
  },

  data() {
    return {
      mdiArrowRight,
    };
  },
  methods: {
    editNews(title) {
      this.$emit("editNews", title);
    },
  },
};
</script>
