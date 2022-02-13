<template>
  <ion-page>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)" pull-factor="0.5" pull-min="100" pull-max="200">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <ion-item>
          <ion-label>{{currentDate}}</ion-label>
          <ion-button>Pilih Tanggal</ion-button>
        </ion-item>
      </ion-list>
        <ion-list v-if="user_not_absents.length > 0">
          <ion-list-header>
            Belum Absensi
          </ion-list-header>
          <ion-item-group>
            <template v-for="absent in absents" :key="absent.name">
              <ion-item-divider>
                <ion-label>{{ absent.name }}</ion-label>
              </ion-item-divider>
              <ion-item v-for="data in absent.absents" :key="data.id">
                <ion-label>
                  <h2>{{data.user_name}}</h2>
                  <h3>Pertemuan : {{data.meeting}}</h3>
                </ion-label>
                <ion-note slot="end">
                  {{data.created_time}}
                </ion-note>
              </ion-item>
            </template>
          </ion-item-group>
        </ion-list>
        <ion-list>
          <ion-list-header>
            Sudah Absensi
          </ion-list-header>
          <ion-item-group v-if="absents.length > 0">
            <template v-for="absent in absents" :key="absent.name">
              <ion-item-divider>
                <ion-label>{{ absent.name }}</ion-label>
              </ion-item-divider>
              <template v-if="absent.absents.length > 0">
                <ion-item v-for="data in absent.absents" :key="data.id">
                  <ion-label>
                    <h2>{{data.user_name}}</h2>
                    <h3>Pertemuan : {{data.meeting}}</h3>
                  </ion-label>
                  <ion-note slot="end">
                    {{data.created_time}}
                  </ion-note>
                </ion-item>
              </template>
              <template v-else>
                <ion-item>Tidak ada absensi</ion-item>
              </template>
            </template>
          </ion-item-group>
        </ion-list>
    </ion-content>
    <ion-loading
      :is-open="isLoading"
      message="Please wait..."
    />
  </ion-page>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonNote, IonItemGroup, IonItemDivider, IonLoading, IonListHeader, IonRefresher, IonRefresherContent } from "@ionic/vue";
import Empty from "@/views/Placeholder/Empty";

import { schedules } from "@/utils/data";
import moment from 'moment';

import AbsentResource from '@/api/absent';
import LectureResource from '@/api/lecture';

const absentResource = new AbsentResource();
const lectureResource = new LectureResource();

export default {
  components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonNote, IonItemGroup, IonItemDivider, IonLoading, IonListHeader, IonRefresher, IonRefresherContent },
  data() {
    return {
      isLoading: false,
      absents: [],
      user_not_absents: [],
      lectures: [],
      current_lectures: [],
      start_date: moment().format('YYYY-MM-DD'),
      end_date: moment().format('YYYY-MM-DD')
    }
  },
  computed: {
    currentDate() {
      moment.locale('id');
      return moment(this.start_date).format('dddd, DD-MM-YYYY')
    }
  },
  async created() {
    this.fetch();
  },
  methods: {
    async fetch(fromRefresher = false, eventRefresher = null) {
      if(!fromRefresher) {
        this.isLoading = true;
      }
      const { start_date, end_date } = this;
      const day = moment(start_date).weekday();
      const { data: absents } = await absentResource.list({ start_date, end_date });
      if(this.lectures.length < 1) {
        const { data: lectures  } = await lectureResource.list();
        this.lectures = lectures;
      }
      this.current_lectures = this.lectures.filter(lecture => lecture.day == day);
      this.absents = this.current_lectures.map(lecture => {
        const data = absents.filter(absent => absent.lecture_id == lecture.id);
        return { ...lecture, absents: data };
      });

      if(!fromRefresher) {
        this.isLoading = false;
      }

      if(fromRefresher) {
        eventRefresher.target.complete()
      }
    },
    doRefresh(event) {
      this.fetch(true, event);
    }
  }
}
</script>

<style>

</style>