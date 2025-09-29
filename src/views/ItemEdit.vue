<template>
  <ul uk-tab>
    <li><router-link to="/">Déconnexion</router-link></li>
    <li><router-link to="/items">Liste</router-link></li>
    <li><router-link :to="`/items/${props.id}/details`">Détails de l'article</router-link></li>
  </ul>

  <form class="toggle-class" @submit.prevent="saveArticle">
    <fieldset class="uk-fieldset">

      <div class="uk-margin-small">
        <div class="uk-inline uk-width-1-1">
          <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="pencil"></span>
          <input v-model="form.title" class="uk-input uk-border-pill" required placeholder="Titre" type="text">
        </div>
      </div>

      <div class="uk-margin-small">
        <div class="uk-inline uk-width-1-1">
          <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="user"></span>
          <input v-model="form.author" class="uk-input uk-border-pill" required placeholder="Auteur" type="text">
        </div>
      </div>

      <div class="uk-margin-small">
        <textarea v-model="form.desc" class="uk-textarea uk-border-rounded" rows="4" required placeholder="Description"></textarea>
      </div>

      <div class="uk-margin-small">
        <div class="uk-inline uk-width-1-1">
          <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="image"></span>
          <input v-model="form.imgPath" class="uk-input uk-border-pill" required placeholder="URL de l'image" type="text">
        </div>
      </div>

      <div class="uk-margin-bottom">
        <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">
          Sauvegarder
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getArticleDetails, editArticleDetails } from "../services/Details"
import router from '../router/index'
import { errorLoadingDetails, errorSaveItem } from "../logsInfo/error"
import { infoGetArticle } from "../logsInfo/info"

// props transmises via la route
const props = defineProps(["id"])

const article = ref(null)
const form = ref({
  title: "",
  desc: "",
  author: "",
  imgPath: ""
})

onMounted(async () => {
  try {
    const data = await getArticleDetails(props.id)
    infoGetArticle(data)
    article.value = data

    // pré-remplissage du formulaire
    if (article.value) {
      form.value = { ...article.value }
    }
  } catch (err) {
    errorLoadingDetails(err)
  }
})

//Sauve garde de l'article
async function saveArticle() {
  try {
    const data = await editArticleDetails(form.value)

    if (data) {
      article.value = data
      router.push({ name: "ItemDetail", params: { id: data.id } })
    }
  } catch (err) {
    errorSaveItem(err)
  }
}
</script>
