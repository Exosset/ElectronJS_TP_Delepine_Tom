<template>
  <ul uk-tab>
    <li class="uk-active">
      <router-link to="/">Déconnexion</router-link>
    </li>
  </ul>

  <div class="spacer"></div>
  <section class="uk-section uk-section-small uk-section-default uk-padding-remove-bottom">
    <div class="uk-container uk-container-expand uk-margin-large-bottom">
      <div
        class="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-child-width-1-5@xl uk-grid-match js-filter uk-flex-top uk-flex-wrap-top uk-sortable"
        data-uk-grid="masonry: true"
        data-uk-sortable="handle: .drag-icon"
      >
        <Card />
      </div>
    </div>
  </section>
</template>

<script setup>
import Card from '../components/Card.vue'
</script>
