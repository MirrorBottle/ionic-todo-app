<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="todo" href="/tabs/todo">
          <ion-icon :icon="$router.currentRoute.value.name === 'Tugas' ? listCircleSharp : listCircleOutline" />
          <ion-label>Tugas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="note" href="/tabs/note">
          <ion-icon :icon="$router.currentRoute.value.name === 'Catatan' ? bookmarksSharp : bookmarksOutline" />
          <ion-label>Catatan</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="$router.currentRoute.value.name === 'Home' ? homeSharp : homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="absent" href="/tabs/absent">
          <ion-icon :icon="$router.currentRoute.value.name === 'Absensi' ? idCardSharp : idCardOutline" />
          <ion-label>Absensi</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="others" href="/tabs/others">
          <ion-icon :icon="$router.currentRoute.value.name === 'Lainnya' ? cogSharp : cogOutline" />
          <ion-label>Lainnya</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { 
  listCircleOutline, 
  bookmarksOutline, 
  idCardOutline, 
  cogOutline,
  homeOutline,
  listCircleSharp,
  bookmarksSharp,
  idCardSharp,
  cogSharp,
  homeSharp,
} from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      listCircleOutline, 
      bookmarksOutline, 
      idCardOutline, 
      cogOutline,
      homeOutline,
      listCircleSharp,
      bookmarksSharp,
      idCardSharp,
      cogSharp,
      homeSharp,
    }
  },
});
</script>
