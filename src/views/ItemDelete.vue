<template>
  <ul uk-tab>
    <li><router-link to="/">Déconnexion</router-link></li>
    <li><router-link to="/items">Liste</router-link></li>
    <li><router-link :to="`/items/${props.id}/details`">Détails de l'article</router-link></li>
  </ul>

  <!-- Carte avec l'article -->
  <div v-if="article" class="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-margin-auto">
    <div class="uk-card-media-top">
      <img :src="article.imgPath" :alt="article.title" class="uk-border-rounded">
    </div>
    <h3 class="uk-card-title">{{ article.title }}</h3>
    <p class="uk-text-meta">Par {{ article.author }}</p>
    <p>{{ article.desc }}</p>
  </div>

  <div v-else class="uk-text-center uk-margin-large-top">
    <span uk-spinner="ratio: 2"></span>
    <p>Chargement de l'article...</p>
  </div>

  <!-- Poppup de suppression-->
    <div id="modal-confirm-delete" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Confirmer la suppression</h2>
      <p>Voulez-vous vraiment supprimer <strong>{{ article?.title }}</strong> ?</p>

      <div class="uk-text-right">
        <button class="uk-button uk-button-default" type="button" @click="cancelDelete">
        Annuler
        </button>
        <button class="uk-button uk-button-danger" type="button" @click="confirmDelete">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted} from "vue"
import { useRouter } from "vue-router"
import { getArticleDetails, deleteArticleById } from "../services/Details"
import { errorDeleteItem } from "../logs/error"
import { infoDeleteItem } from "../logs/info"
import UIkit from "uikit" // 👈 pour manipuler la modal

const props = defineProps(["id"])
const article = ref(null)
const router = useRouter()

onMounted(async () => {
  article.value = await getArticleDetails(props.id)

  const modal = UIkit.modal("#modal-confirm-delete")
  modal.hide() // 👈 réinitialisation
  modal.show()
})

function cancelDelete() {
  const modal = UIkit.modal("#modal-confirm-delete")
  modal.hide()

  setTimeout(() => {
    router.push({ name: "ItemDetail", params: { id: props.id } })
  }, 200)
}

async function confirmDelete() {
  try {
    const modal = UIkit.modal("#modal-confirm-delete")
    modal.hide()
    const res = await deleteArticleById(props.id)
    infoDeleteItem(res)
    setTimeout(() => {
        router.push({ name: "ItemsList" })
    }, 200)
  } catch (err) {
    errorDeleteItem(err)
  }
}
</script>
