<template>
  <ion-app>
    <ion-page>
      <Header />
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
  }
});
</script>