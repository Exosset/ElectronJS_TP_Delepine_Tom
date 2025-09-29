<template>
  <div class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" style="min-height: 100vh;">
    <div class="uk-width-medium uk-padding-small">
      <ul uk-tab>
        <li><router-link to="/">Connexion</router-link></li>
        <li>Inscription</li>
      </ul>

      <form class="toggle-class" @submit.prevent="createAuth">
        <fieldset class="uk-fieldset">
          
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="mail"></span>
              <input v-model="email" class="uk-input uk-border-pill" required placeholder="Email" type="email">
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="user"></span>
              <input v-model="pseudo" class="uk-input uk-border-pill" required placeholder="Pseudo" type="text">
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="home"></span>
              <input v-model="address" class="uk-input uk-border-pill" required placeholder="Adresse" type="text">
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="location"></span>
              <input v-model="city" class="uk-input uk-border-pill" required placeholder="Ville" type="text">
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="receiver"></span>
              <input v-model="phone" class="uk-input uk-border-pill" required placeholder="Numéro de téléphone" type="tel">
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="lock"></span>
              <input v-model="password" class="uk-input uk-border-pill" required placeholder="Mot de passe" type="password">
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="lock"></span>
              <input v-model="passwordConfirm" class="uk-input uk-border-pill" required placeholder="Mot de passe de confirmation" type="password">
            </div>
          </div>
          
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">
              S'inscrire
            </button>
          </div>

        </fieldset>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addAuth } from '../auth/auth'
import router from '../router/index'
import { errorUserCreate } from '../logs/error'
import { warnServerUser } from '../logs/warn'
import { infoAuthCreate } from '../logs/info'

// état local du formulaire
const email = ref("")
const password = ref("")
const pseudo = ref("")
const address = ref("")
const city = ref("")
const phone = ref("")
const passwordConfirm = ref("")

async function createAuth() {
  try {
    const newUser = await addAuth(
      email.value,
      password.value,
      pseudo.value,
      address.value,
      city.value,
      phone.value,
      passwordConfirm.value
    )

    infoAuthCreate(newUser)

    if (newUser.code === "200") {
      router.push({ name: "ItemsList" })
    } else {
      warnServerUser(newUser)
    }
  } catch (err) {
    errorUserCreate(err)
  }
}

</script>
