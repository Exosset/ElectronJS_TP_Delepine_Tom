<template>
  <ul uk-tab>
    <li><router-link to="/">Déconnexion</router-link></li>
    <li><router-link to="/items">Liste</router-link></li>
    <li><router-link :to="`/items/${props.id}/edit`">Modifier l'article</router-link></li>
    <li><router-link :to="`/items/${props.id}/delete`">Supprimer l'article</router-link></li>
  </ul>

  <div v-if="article" class="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-margin-auto">
    <!-- Image -->
    <div class="uk-card-media-top">
      <img :src="article.imgPath" :alt="article.title" class="uk-border-rounded">
    </div>

    <!-- Contenu -->
    <h3 class="uk-card-title">{{ article.title }}</h3>
    <p class="uk-text-meta">Par {{ article.author }}</p>
    <p>{{ article.desc }}</p>
  </div>

  <!-- Loader -->
  <div v-else class="uk-text-center uk-margin-large-top">
    <span uk-spinner="ratio: 2"></span>
    <p>Chargement de l'article...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getArticleDetails } from "../services/Details"
import { errorLoadingDetails } from "../logs/error"
import { infoGetArticle } from "../logs/info"

// props transmises via route (props: true)
const props = defineProps(["id"])

const article = ref(null)

//pour déclencher le fetch au bon moment
onMounted(async () => {
  try {
    const data = await getArticleDetails(props.id)
    infoGetArticle(data)
    article.value = data
  } catch (err) {
    errorLoadingDetails(err)
  }
})
</script>
