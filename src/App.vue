<template>
  <ion-app>
    <ion-page>
      <Header v-if="$router.currentRoute.value.name !== 'login'" />
      <ion-router-outlet />
    </ion-page>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import Header from '@/components/Header';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    Header,
    IonPage,
    IonRouterOutlet
  },
  created() {
    const user = localStorage.getItem('TODO_USER');
    if(!user || user == 'undefined') {
      this.$router.push({ name: 'login' })
    }
  }
});
</script>

<style lang="scss">
  ion-router-outlet .ion-page {
    padding-top:3rem;
  }
  ion-refresher {
    padding-top:8rem;
  }
</style>