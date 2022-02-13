<template>
  <ion-content>
    <ion-list lines="full" class="ion-no-margin pb2">
      <ion-item>
        <ion-datetime locale="id" presentation="date" class="mt2" v-model="form.date" display-format="DD-MMM-YYYY" picker-format="YYYY-MM-DD">
          <div slot="title">Tanggal Absensi</div>
        </ion-datetime>
      </ion-item>
      <ion-item class="mt2">
        <ion-label position="stacked">Pertemuan</ion-label>
        <ion-select v-model="form.meeting">
          <ion-select-option v-for="meeting in meetings" :key="meeting" :value="meeting">{{meeting}}</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item class="mt2">
        <ion-label position="stacked">Mata Kuliah</ion-label>
        <ion-select v-model="form.lecture_id">
          <ion-select-option v-for="lecture in lectures" :key="lecture.id" :value="lecture.id">{{lecture.name}}</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>
    <ion-button @click="handleSubmit" expand="block" class="mb2">Absen</ion-button>
  </ion-content>
  <ion-loading
    :is-open="isLoading"
    message="Please wait..."
  />
</template>

<script>
import moment from 'moment';
import LectureResource from '@/api/lecture';
import AbsentResource from '@/api/absent';
import { IonList, IonListHeader, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, IonContent, IonLoading, IonDatetime } from "@ionic/vue";
import { schedules } from "@/utils/data";
import { user, toast, getLectures, setLectures } from "@/utils/helper";

const absentResource = new AbsentResource();
const lectureResource = new LectureResource();

export default {
  components: { IonList, IonListHeader, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, IonContent, IonLoading, IonDatetime },
  data() {
    return {
      form: {
        lecture_id: null,
        meeting: 1,
        date: moment().toISOString(),
      },
      lectures: [],
      isLoading: false,
      meetings: Array.from({length: 16}, (_, i) => i + 1)
    }
  },
  methods: {
    async init() {
      const localLectures = getLectures();
      if(localLectures.length < 1) {
        this.isLoading = true;
        const{ data: lectures } = await lectureResource.list();
        setLectures(lectures);
        this.lectures = lectures;
        this.isLoading = false;
      } else {
        this.lectures = localLectures;
      }
    },
    handleSubmit() {
      const user_id = user('id');
      const form = {
        ...this.form,
        user_id,
        date: moment(this.form.date).format('YYYY-MM-DD')
      }
      this.isLoading = true;
      absentResource
        .store(form)
        .then(() => toast('Berhasil menambah absensi', 'success'))
        .catch((err) => {
          console.log(err.response, err.response.message);
          toast(err.response.message, 'danger')
        })
        .finally(() => this.isLoading = false)
    }
  }
}
</script>

<style>

</style>