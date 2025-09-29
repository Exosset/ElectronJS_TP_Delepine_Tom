<template>
  <div
    v-for="article in lesArticles"
    :key="article.id"
    class="nature-card uk-first-column"
    data-tags="a beautiful landscape - nature outdoor"
    style="transform: translate(0px);"
  >
    <div class="uk-card uk-card-small uk-card-default">
      <div class="uk-card-header">
        <div class="uk-grid uk-grid-small uk-text-small" data-uk-grid="">
          <div class="uk-width-expand uk-first-column">
            <span class="cat-txt">{{ article.author }}</span>
          </div>
        </div>
      </div>

      <div class="uk-card-media">
        <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
          <!-- 👇 binding dynamique avec ":" -->
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import log from 'electron-log/renderer'
import {getArticles} from '../services/Articles'

const lesArticles = ref([])

async function CollectArticles() {
  try {
    const articles = await getArticles()
    log.info("Articles récupérés :", articles)

    if (Array.isArray(articles) && articles.length > 0) {
            console.log(articles)
      lesArticles.value = articles
    } else {
      log.warn("Aucun article reçu")
    }
  } catch (err) {
    log.error("Erreur lors de la récupération :", err)
  }
}

onMounted(() => {
  CollectArticles()
})
</script>
