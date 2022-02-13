<template>
  <ion-app>
    <ion-page>
      <Header v-if="$router.currentRoute.value.name !== 'login'" />
      <ion-router-outlet />
      <ion-fab v-if="$router.currentRoute.value.name !== 'login'" horizontal="end" vertical="bottom" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="appsOutline"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button color="light" @click="$router.push({ path: '/admin/absent' })">
            <ion-icon :icon="idCardOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button color="light" @click="$router.push({ path: '/admin/todo' })">
            <ion-icon :icon="listCircleOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button color="light" @click="$router.push({ path: '/admin/note' })">
            <ion-icon :icon="bookmarksOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button color="light" @click="$router.push({ path: '/tabs/home' })">
            <ion-icon :icon="homeOutline"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>
    </ion-page>
  </ion-app>
</template>

<script>
import { 
  IonApp, 
  IonRouterOutlet, 
  IonPage,
  IonFab,
  IonFabList,
  IonFabButton,
  IonIcon,
} from '@ionic/vue';
import { 
  listCircleOutline, 
  bookmarksOutline, 
  idCardOutline,
  homeOutline, 
  appsOutline
} from 'ionicons/icons';
import { getSettings } from "@/utils/helper";
import { defineComponent } from 'vue';
import Header from '@/components/Header';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    IonApp,
    IonRouterOutlet,
    IonPage,
    IonFab,
    IonFabList,
    IonFabButton,
    IonIcon,
  },
  data() {
    return {
      listCircleOutline, 
      bookmarksOutline, 
      idCardOutline,
      homeOutline,
      appsOutline
    }
  },
  created() {
    const settings = getSettings();
    const user = localStorage.getItem('TODO_USER');
    if(!user || user == 'undefined') {
      this.$router.push({ name: 'login' })
    }
    document.body.setAttribute('color-theme', settings.theme)
  }
});
</script>

<style lang="scss">
  ion-fab {
    bottom: 80px!important;
    right: 20px!important;
  }
  ion-router-outlet .ion-page {
    padding-top:3rem;
  }
  ion-refresher {
    padding-top:8rem;
  }
</style>