<template>
  <div
    v-for="article in lesArticles"
    :key="article.id"
    class="nature-card uk-first-column"
    data-tags="a beautiful landscape - nature outdoor"
    style="transform: translate(0px);"
  >
    <router-link :to="`/items/${article.id}/details`">
      <div class="uk-card uk-card-small uk-card-default">

        <div class="uk-card-header">
          <div class="uk-grid uk-grid-small uk-text-small" data-uk-grid>
            <div class="uk-width-expand uk-first-column">
              <span class="cat-txt">{{ article.author }}</span>
            </div>
          </div>
        </div>

        <div class="uk-card-media">
          <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
            <img
              class="lazy"
              :src="article.imgPath"
              :data-src="article.imgPath"
              data-width="400"
              data-height="300"
              data-uk-img
              :alt="article.title"
            />
          </div>
        </div>

        <div class="uk-card-body">
          <h6 class="uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">
            {{ article.title }}
          </h6>
          <p class="uk-text-small uk-text-muted">
            {{ article.desc }}
          </p>
        </div>
        
      </div>
    </router-link>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import log from 'electron-log/renderer'
import {getArticles} from '../services/Articles'
import { errorGetItems } from '../logs/error'
import { warnNothingItem } from '../logs/warn'
import { infoGetArticles } from '../logs/info'

const lesArticles = ref([])

async function CollectArticles() {
  try {
    const articles = await getArticles()
    infoGetArticles(articles)

    if (Array.isArray(articles) && articles.length > 0) {
      lesArticles.value = articles
    } else {
      warnNothingItem()
    }
  } catch (err) {
    errorGetItems(err)
  }
}

onMounted(() => {
  CollectArticles()
})
</script>
