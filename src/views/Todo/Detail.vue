<template>
  <ion-page>
    <div class="deadline-container">
      <ion-chip>
        <ion-label color="danger">Deadline : {{todo.deadline}}</ion-label>
      </ion-chip>
    </div>
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>{{todo.lesson_format}}</ion-card-subtitle>
        <ion-card-title>{{todo.title}}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>{{todo.description}}</p>
        <template v-if="todo.form_link">
          <div class="form-link-container">
            <a :href="todo.form_link" target="_system" rel="noopener noreferrer" >
              {{todo.form_link}}
            </a>
            <ion-button @click="handleCopyClick" size="small">
              Copy
            </ion-button>
          </div>
        </template>
      </ion-card-content>
      
    </ion-card>
    <ion-loading
      :is-open="isLoading"
      message="Please wait..."
    />
  </ion-page>
</template>

<script>
import { copyText } from 'vue3-clipboard'
import { 
  IonPage, 
  IonLoading,
  IonButton
} from '@ionic/vue';
import TodoResource from '@/api/todo';

const todoResource  = new TodoResource();
export default {
  name: 'TodoDetail',
  components: {
    IonPage, 
    IonLoading,
    IonButton,
  },
  async ionViewDidEnter() {
    this.isLoading = true;
    const id = this.$route.params && this.$route.params.id;
    const { data } = await todoResource.get(id);
    this.todo = data;
    this.isLoading = false;
  },
  data() {
    return {
      todo: {},
      isLoading: true,
    }
  },
  methods: {
    handleCopyClick() {
      copyText(this.todo.form_link, undefined, (error) => {
        if (error) {
          alert('Can not copy')
        } else {
          alert('Copied')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ion-page {
  justify-content: flex-start!important;
}
.reload-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: right;
  padding-right: 1rem;
}
.deadline-container {
  margin: 20px 10px 5px 10px;
  p {
    font-weight: bold;
    color: #FF0000;
  }
}
.form-link-container {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  word-break: break-all;
}
</style>