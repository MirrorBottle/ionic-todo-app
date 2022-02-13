<template>
  <ion-page>
    <ion-content fullscreen :scroll-events="true">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)" pull-factor="0.5" pull-min="100" pull-max="200">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <template v-if="!isLoading">
        <ion-list v-if="notes.length > 0">
          <ion-item v-for="note in notes" button @click="handleItemClick(note)">
            <ion-label>
              <h2>{{note.title}}</h2>
              <p>{{note.description}}</p>
            </ion-label>
          </ion-item>
        </ion-list>
        <empty v-else message="Kosong gan..." />
      </template>
      <skeleton v-else :iterations="6" />
    </ion-content>

    <ion-modal 
      :is-open="isModalOpen"
      :breakpoints="[0.1, 0.5, 1]"
      :initialBreakpoint="0.5"
      @ionModalDidDismiss="isModalOpen = false"
    >
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>{{selectedNote.title}}</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="isModalOpen = false">Tutup</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <p>{{selectedNote.description}}</p>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script>
import Empty from "@/views/Placeholder/Empty";
import Skeleton from "@/views/Placeholder/Skeleton";
import { copyText } from 'vue3-clipboard'
import { pencilOutline, trashBinOutline, refreshOutline } from 'ionicons/icons';
import {
  IonPage, 
  IonLoading, 
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonButton,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
} from '@ionic/vue';

import NoteResource from '@/api/note';

const noteResource  = new NoteResource();
export default {
  name: 'NoteIndex',
  components: {
    Empty,
    Skeleton,
    IonPage, 
    IonLoading, 
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonButton,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
  },
  data() {
    return {
      pencilOutline, trashBinOutline, refreshOutline,
      notes: [],
      isLoading: true,
      isModalOpen: false,
      selectedNote: {},
    }
  },
  async created() {
    const { data } = await noteResource.list();
    this.notes = data;
    this.isLoading = false;
  },
  methods: {
    async doRefresh(event) {
      const { data } = await noteResource.list();
      this.notes = data;
      event.target.complete()
    },
    handleItemClick(note) {
      this.selectedNote = note;
      this.isModalOpen = true;
    },
    handleDeleteClick(note) {
      this.isLoading = true;
      noteResource
        .destroy(note.id)
        .then(() => {
          this.doRefresh();
        })
        .catch(() => {
          this.doRefresh();
        })
    }
  }
}
</script>

<style lang="scss" scoped>
ion-content {
  overflow: hidden;
}
.ion-page {
  justify-content: flex-start!important;
}
.reload-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: right;
  padding-right: 1rem;
  z-index: 999;
}
.empty-state {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>