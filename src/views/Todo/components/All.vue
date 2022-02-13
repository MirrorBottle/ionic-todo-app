<template>
  <ion-content fullscreen :scroll-events="true">
    <template v-if="!isLoading">
      <ion-list v-if="todos.length > 0">
        <ion-item v-for="todo in todos" :key="todo.id" button @click="handleItemClick(todo)">
          <ion-label>
            <h2>{{todo.title}}</h2>
            <p>{{todo.lecture_name}}</p>
            <p>{{todo.description}}</p>
          </ion-label>
          <ion-note slot="end">
            {{todo.deadline}}
          </ion-note>
        </ion-item>
      </ion-list>
      <empty v-else message="Kosong gan..." />
    </template>
    <skeleton v-else :iterations="6" />
  </ion-content>
</template>

<script>
import Empty from "@/views/Placeholder/Empty";
import Skeleton from "@/views/Placeholder/Skeleton";
import TodoDetail from "@/components/Todo/Detail";
import {
  TodoDetail,
  IonContent,
  IonList,
  IonItem,
  IonNote,
  IonLabel,
  IonRefresher,
  IonRefresherContent
} from "@ionic/vue";
export default {
  name: 'TodoAll',
  copmponents: {
    Empty,
    Skeleton,
    TodoDetail,
    IonContent,
    IonList,
    IonItem,
    IonNote,
    IonLabel,
    IonRefresher,
    IonRefresherContent
  },
  data() {
    return {
      isLoading: false,
      isModalOpen: false,
      todos: [],
      todo: {}
    }
  }
}
</script>

<style>

</style>