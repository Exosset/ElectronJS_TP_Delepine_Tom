<template>
    <form>
        <input class="uk-input" type="text">
        <select class="uk-select">
            <option>Test 1</option>
            <option>Test 2</option>
        </select>
        <textarea class="uk-textarea"></textarea>
        <input class="uk-radio" type="radio">
        <input class="uk-checkbox" type="checkbox">
        <input class="uk-range" type="range">
    </form>

</template>

<script setup>

import { ref } from 'vue';
import log from 'electron-log/renderer';

const movies = ref([]);

async function callApi() {
    // TODO : Afficher chargement

    //appeler l'API


    const res = await fetch('https://raw.githubusercontent.com/Chocolaterie/EniWebService/main/api/movies.json');

    const data = await res.json();

    if (data.length != 0) {
        movies.value = data
        log.info('Le JSON a été récupéré');
    } else {
        log.error('Le JSON a pas été récupéré');
    }


    //Récupérer le JSON

    // TODO : Fermer le chargement
}

</script>