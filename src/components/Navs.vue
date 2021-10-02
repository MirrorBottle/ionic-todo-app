<template>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="todo" href="/tabs/todo">
      <ion-icon :icon="listOutline"></ion-icon>
      <ion-label>To Do</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="note" href="/tabs/note">
      <ion-icon :icon="bookmarkOutline"></ion-icon>
      <ion-label>Notes</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="archive" href="/tabs/archive">
      <ion-icon :icon="folderOpenOutline"></ion-icon>
      <ion-label>Archive</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script>
import { 
  IonIcon, 
  IonLabel, 
  IonTabBar, 
  IonTabButton
} from '@ionic/vue';
import { bookmarkOutline, addOutline, listOutline, folderOpenOutline } from 'ionicons/icons';

export default {
  components: { IonIcon, IonLabel, IonTabBar, IonTabButton },
  data() {
    return {
      bookmarkOutline, addOutline, listOutline, folderOpenOutline
    }
  }
};
</script>

<style>

</style>