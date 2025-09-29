<template>
    <ul uk-tab>
    <li>
        Connection
    </li>
    <li>
        <router-link to="/inscription">Inscription</router-link>
    </li>
    </ul>
  <body class="uk-flex uk-flex-center uk-flex-middle uk-background-muted uk-height-viewport" style="min-height: 100vh;">
    <div class="uk-width-medium uk-padding-small">
      <!-- login -->
      <form class="toggle-class" @submit.prevent="sendAuth">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="user"></span>
              <input v-model="email" class="uk-input uk-border-pill" required placeholder="Username" type="text">
            </div>
          </div>

          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="lock"></span>
              <input v-model="password" class="uk-input uk-border-pill" required placeholder="Password" type="password">
            </div>
          </div>

          <div class="uk-margin-small">
            <label>
              <input v-model="remember" class="uk-checkbox" type="checkbox"> Keep me logged in
            </label>
          </div>

          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1">Se connecter</button>
          </div>
        </fieldset>
      </form>
      <!-- /login -->
    </div>
  </body>
</template>


<script setup>
import { ref } from 'vue'
import log from 'electron-log/renderer'
import { setAuth } from '../auth/auth'
import router from '../router/index'
import { infoAuthSend, infoRememberActivated } from '../logs/info'

// état local du formulaire
const email = ref("")
const password = ref("")
const remember = ref(false)

async function sendAuth() {
  const user = await setAuth(email.value, password.value)

  infoAuthSend(user)

    if (user.code === '200') {
        router.push({ name: "ItemsList" })
    }

  if (remember.value) {
    infoRememberActivated()
  }
}
</script>