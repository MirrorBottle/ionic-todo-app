<template>
  <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="todo" href="/tabs/schedule">
        <ion-icon :icon="listOutline"></ion-icon>
        <ion-label>To Do</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="notes" href="/tabs/schedule">
        <ion-icon :icon="bookmarkOutline"></ion-icon>
        <ion-label>Notes</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="speakers" href="/tabs/speakers">
        <ion-icon :icon="addOutline"></ion-icon>
        <ion-label>Add</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script>
import { 
  IonIcon, 
  IonLabel, 
  IonTabBar, 
  IonTabButton, 
  IonTabs
} from '@ionic/vue';
import { bookmarkOutline, addOutline, listOutline } from 'ionicons/icons';

export default {
  components: { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs },
  data() {
    return {
      bookmarkOutline, addOutline, listOutline
    }
  }
};
</script>

<style>

</style>