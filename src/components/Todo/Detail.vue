<template>
  <ion-modal 
    :is-open="isOpen"
    :breakpoints="[0.1, 0.5, 1]"
    :initialBreakpoint="0.5"
    @ionModalDidDismiss="$emit('close')"
  >
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>{{todo.title}}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="$emit('close')">Tutup</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
        <ion-item>
          <ion-label>Mata Kuliah</ion-label>
          <ion-badge slot="end">{{todo.lecture_name}}</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>Deadline</ion-label>
          <ion-badge color="danger" slot="end">{{todo.deadline}}</ion-badge>
        </ion-item>
        <ion-item>
          <p>{{todo.description}}</p>
        </ion-item>
        <ion-item>
          <ion-button size="default" expand="block" color="success" style="width: 100%">Tandai Selesai</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script>
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonItem, IonLabel, IonBadge } from "@ionic/vue";
export default {
  name: 'TodoDetail',
  components: { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonItem, IonLabel, IonBadge },
  props: {
    todo: {
      type: Object,
      default: {}
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>