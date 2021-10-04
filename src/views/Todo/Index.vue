<template>
  <ion-page>
    <div class="reload-container">
      <ion-button @click="doRefresh" size="small">
        <ion-icon :icon="refreshOutline"></ion-icon>
        Reload
      </ion-button>
    </div>
    <template v-if="todos.length > 0">
      <ion-content fullscreen :scroll-events="true">
        <ion-list>
          <ion-item-sliding v-for="todo in todos" :key="todo.id">
            <ion-item button @click="handleItemClick(todo)">
              <ion-label>
                <h2>{{todo.title}}</h2>
                <p>{{todo.lesson_format}}</p>
                <p>{{todo.description}}</p>
              </ion-label>
              <ion-note slot="end">
                {{todo.deadline}}
              </ion-note>
            </ion-item>
          </ion-item-sliding>
        </ion-list>
      </ion-content>
    </template>
    <template v-else>
      <div class="empty-state">
        <ion-icon size="large" :icon="happyOutline"></ion-icon>
        <h2>Cie... gak ada tugas nih</h2>
      </div>
    </template>
    
    <ion-loading
      :is-open="isLoading"
      message="Please wait..."
    />
  </ion-page>
</template>

<script>
import { folderOutline, trashBinOutline, refreshOutline, happyOutline } from 'ionicons/icons';
import { 
  IonPage, 
  IonLoading, 
  IonList,
  IonItem,
  IonItemSliding,
  IonNote,
  IonLabel,
  IonButton,
  IonContent,
} from '@ionic/vue';

import TodoResource from '@/api/todo';

const todoResource  = new TodoResource();
export default {
  name: 'TodoIndex',
  components: {
    IonPage, 
    IonLoading, 
    IonList,
    IonItem,
    IonItemSliding,
    IonNote,
    IonLabel,
    IonButton,
    IonContent,
  },
  data() {
    return {
      folderOutline, trashBinOutline, refreshOutline, happyOutline,
      todos: [],
      isLoading: true,
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
      this.$router.push({ name: 'To Do Detail', params: { id: todo.id } })
    },
    handleDeleteClick(todo) {
      this.isLoading = true;
      todoResource
        .destroy(todo.id)
        .finally(() => this.doRefresh())
    },
    handleArchiveClick(todo) {
      this.isLoading = true;
      todoResource
        .update(todo.id, { is_archive: 1 })
        .finally(() => this.doRefresh())
    }
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