<template>
  <q-page class="q-pa-md">
    <div class="text-h3 text-center">Sobre</div>
    <q-separator spaced />
    <div class="container">
      <div>
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="300px"
          class="bg-primary text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <q-icon name="widgets" size="56px" />
            <div class="q-mt-md text-center">
              Projeto desenvolvido com o framework Quasar que roda sobre o VueJS
              (neste caso a versão 3) e Axios.
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <q-icon name="live_tv" size="56px" />
            <div class="q-mt-md text-center">
              Baseado na playlist "CRUD com Vue 3, Quasar e Axios" do canal
              Patrick Monteiro .
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers" class="column no-wrap flex-center">
            <q-icon name="layers" size="56px" />
            <div class="q-mt-md text-center">
              O objetivo é aprender consumir uma API com o Axios no Frontend,
              como trabalhar com o Quasar e a utilização de Composables e
              Services.
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map" class="column no-wrap flex-center">
            <q-icon name="extension" size="56px" />
            <div class="q-mt-md text-center">
              Foi utilizado o plugin json-server do Node para a criação da REST
              API.
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>

      <q-separator spaced />

      <div class="contatos"></div>
      <p class="text-center text-h3">Meus Contatos</p>

      <q-separator spaced />

      <div class="q-gutter-md text-center q-pa-md">
        <a href="mailto:richardfelixrosa@gmail.com" target="_blank"
          ><img
            src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white"
            alt="Escreva para mim"
            style="height: 42px"
        /></a>
        <a href="https://www.linkedin.com/in/richard-rosa94/"
          ><img
            src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"
            alt="Envie uma mensagem"
            style="height: 42px"
        /></a>
        <a href="https://github.com/Richardflx"
          ><img
            src="https://img.shields.io/badge/GitHub-black?style=for-the-badge&logo=github&logoColor=white"
            alt="Envie uma mensagem"
            style="height: 42px"
        /></a>
      </div>
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title class="text-center"
          >Desenvolvido por Richardflx</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AboutPage",
  setup() {
    return {
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
};
</script>
