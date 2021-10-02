<template>
  <ion-page>
    <ion-segment v-model="segment">
      <ion-segment-button value="todo">
        <ion-icon :icon="listOutline"></ion-icon>
        <ion-label>To Do</ion-label>
      </ion-segment-button>
      <ion-segment-button value="note">
        <ion-icon :icon="bookmarkOutline"></ion-icon>
        <ion-label>Note</ion-label>
      </ion-segment-button>
    </ion-segment>

    <!-- TODO FORM -->
    <template v-if="segment == 'todo'">
      <ion-list lines="full" class="ion-no-margin">
        <ion-list-header lines="full">
          <ion-label>
           Tambah To Do Baru
          </ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label position="stacked">Judul</ion-label>
          <ion-input v-model="todo.title"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Mata Kuliah</ion-label>
          <ion-select interface="popover" v-model="todo.lesson">
            <ion-select-option v-for="lesson in lessons" :key="lesson.val" :value="lesson.val">{{lesson.title}}</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Deskripsi</ion-label>
          <ion-textarea v-model="todo.description"></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Deadline</ion-label>
          <ion-datetime display-format="DD-MMM-YYYY hh:mm" picker-format="YYYY-MM-DD hh:mm" v-model="todo.deadline"></ion-datetime>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Form Link</ion-label>
          <ion-input v-model="todo.form_link"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button @click="handleTodoSubmit">Tambah</ion-button>
    </template>

    <template v-else>
      <ion-list lines="full" class="ion-no-margin">
        <ion-list-header lines="full">
          <ion-label>
           Tambah To Do Baru
          </ion-label>
        </ion-list-header>
        <ion-item>
          <ion-label position="stacked">Judul</ion-label>
          <ion-input v-model="note.title"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Deskripsi</ion-label>
          <ion-textarea v-model="note.description"></ion-textarea>
        </ion-item>
      </ion-list>
      <ion-button @click="handleNoteSubmit">Tambah</ion-button>
    </template>

    <ion-loading
      :is-open="isLoading"
      message="Please wait..."
    />
    <ion-toast
      :is-open="isSuccess"
      color="success"
      :message="segment == 'todo' ? 'Todo ditambahkan!' : 'Note ditambahkan'"
      :duration="2000"
      @didDismiss="isSuccess = false"
    />
  </ion-page>
</template>

<script>
import moment from 'moment';
import { bookmarkOutline, listOutline } from 'ionicons/icons';
import { 
  IonPage, 
  IonLoading, 
  IonSegment, 
  IonSegmentButton,
  IonInput,
  IonTextarea,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonToast,
} from '@ionic/vue';
import TodoResource from '@/api/todo';
import NoteResource from '@/api/note';

const todoResource  = new TodoResource();
const noteResource  = new NoteResource();
export default {
  name: 'Add',
  components: {
    IonPage, 
    IonLoading, 
    IonSegment, 
    IonSegmentButton,
    IonInput,
    IonTextarea,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonToast
  },
  data() {
    return {
      bookmarkOutline, listOutline,
      todo: {
        title: '',
        description: '',
        lesson: '',
        form_link: '',
        deadline: moment().format('YYYY-MM-DD HH:mm:ss'),
      },
      note: {
        title: '',
        description: ''
      },
      lessons: [
        {
          val: '1',
          title: 'Pendidikan Agama Islam'
        },
        {
          val: '2',
          title: 'Pendidikan Agama Katolik'
        },
        {
          val: '3',
          title: 'Pendidikan Agama Kristen Protestan'
        },
        {
          val: '4',
          title: 'Pendidikan Agama Hindu'
        },
        {
          val: '5',
          title: 'Pendidikan Agama Budha'
        },
        {
          val: '6',
          title: 'Bahasa Inggris 1'
        },
        {
          val: '7',
          title: 'Kalkulus'
        },
        {
          val: '8',
          title: 'Logika Informatika'
        },
        {
          val: '9',
          title: 'Algoritma dan Pemrograman Dasar'
        },
        {
          val: '10',
          title: 'Pengantar Teknologi Informasi'
        },
        {
          val: '11',
          title: 'Pendidikan Pancasila'
        },
        {
          val: '12',
          title: 'Ilmu Sosial dan Budaya Dasar'
        },
        {
          val: '13',
          title: 'Fisika Dasar'
        },
      ],
      segment: 'todo',
      isLoading: false,
      isSuccess: false,
    }
  },
  methods: {
    moment,
    async handleTodoSubmit() {
      this.isLoading = true;
      const resp = await todoResource.store(this.todo)
      if(resp) {
        this.isLoading = false;
        this.isSuccess = true;
        this.$router.push('/tabs/todo');
      }
    },
    async handleNoteSubmit() {
      this.isLoading = true;
      const resp = await noteResource.store(this.note)
      if(resp) {
        this.isLoading = false;
        this.isSuccess = true;
        this.$router.push('/tabs/note');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .ion-page {
    justify-content: flex-start!important;
  }
</style>