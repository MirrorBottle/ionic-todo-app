<template>
  <ion-page>
    <ion-segment v-model="segment" class="pt1">
      <ion-segment-button value="all">
        <ion-label>Semua</ion-label>
      </ion-segment-button>
      <ion-segment-button value="done">
        <ion-label>Selesai</ion-label>
      </ion-segment-button>
      <ion-segment-button value="archive">
        <ion-label>Arsip</ion-label>
      </ion-segment-button>
    </ion-segment>
  </ion-page>
</template>

<script>
import Empty from "@/views/Placeholder/Empty";
import Skeleton from "@/views/Placeholder/Skeleton";
import { 
  IonPage, 
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonNote,
  IonLabel,
  IonButton,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle
} from '@ionic/vue';

import TodoResource from '@/api/todo';
const todoResource  = new TodoResource();

export default {
  name: 'TodoIndex',
  components: {
    Empty,
    Skeleton,
    IonPage,  
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonNote,
    IonLabel,
    IonButton,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonSearchbar,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle
  },
  data() {
    return {
      todos: [],
      todo: {},
      segment: 'all',
      isLoading: true,
      isModalOpen: false,
    }
  },
  async created() {
    const { data } = await todoResource.list();
    this.todos = data;
    this.isLoading = false;
  },
  methods: {
    async doRefresh() {
      this.isLoading = true;
      const { data } = await todoResource.list();
      this.todos = data;
      this.isLoading = false;
    },
    handleItemClick(todo) {
      this.todo = todo;
      this.isModalOpen = true;
    },
  }
}
</script>

<style lang="scss" scoped>
ion-content {
  overflow: hidden;
}
ion-list {
  padding-bottom: 5rem;
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