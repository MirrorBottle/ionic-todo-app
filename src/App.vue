<template>
  <ion-app>
    <ion-page>
      <Header />
      <ion-router-outlet />
      <Navs />
    </ion-page>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonPage } from '@ionic/vue';
import Header from '@/components/Header';
import Navs from '@/components/Navs';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonPage,
    Header,
    Navs
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