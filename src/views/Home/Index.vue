<template>
  <ion-page class="ion-page px2">
    <ion-content>
      <h3 class="mb2"><b>Hi</b>, {{user.name}}</h3>

      <ion-card v-if="settings.set_notification == 'not_yet'" class="mx0 mb2" color="danger">
        <ion-card-header>
          <ion-card-subtitle>Pengaturan</ion-card-subtitle>
          <ion-card-title>Aktifkan Notifikasi</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>Jika ingin mendapatkan notifikasi 15 menit sebelum jadwal perkuliahan dimulai, aktifkan pengaturan ini.</p>
          <div class="flex mt2 justify-end">
            <ion-button color="dark" @click="handleNotificationActiveClick">Aktifkan</ion-button>
            <ion-button color="light" fill="clear" @click="handleNotificationNonactiveClick">Tidak</ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card class="mx0 mb2" color="tertiary">
        <ion-card-header>
          <ion-card-subtitle>{{date}}</ion-card-subtitle>
          <ion-card-title>Jadwal Hari Ini</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="schedule-lectures" v-if="schedule">
            <div class="schedule-lecture mb1" v-for="lecture in schedule.lectures">
              <p class="schedule-lecture-title"><b>{{lecture.lecture}} ({{lecture.time}})</b></p>
              <p class="schedule-lecture-body" style="font-size: 12px">{{lecture.room}}</p>
            </div>
          </div>
          <div v-else>
            <p>Libur bos...</p>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card class="mx0 mb2" color="primary">
        <ion-card-header>
          <ion-card-subtitle>Pengumuman</ion-card-subtitle>
          <ion-card-title>Lorem, ipsum dolor.</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Founded in 1829 on an isthmus between Lake Monona and Lake Mendota
        </ion-card-content>
        <ion-card-header>
          <ion-card-title>Lorem, ipsum dolor.</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Founded in 1829 on an isthmus between Lake Monona and Lake Mendota
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from "@ionic/vue";
import { user as getUser, setNotifications, getSettings, setSettings } from "@/utils/helper";
import { schedules } from "@/utils/data";
import moment from "moment";
export default {
  name: 'HomeIndex',
  displayName: 'HomeIndex',
  components: { IonContent, IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton },
  data() {
    return {
      settings: getSettings()
    }
  },
  computed: {
    user() {
      const user = getUser();
      return user;
    },
    date() {
      moment.locale('id');
      return moment().format('dddd, DD MMMM YYYY');
    },
    schedule() {
      return schedules.filter(schedule => schedule.id == moment().weekday())[0];
    }
  },
  methods: {
    async handleNotificationActiveClick() {
      setSettings({...this.settings, notification: 'on', set_notification: 'done'})
      setNotifications();
    },
    handleNotificationNonactiveClick() {
      setSettings({...this.settings, notification: 'off', set_notification: 'done'})
      this.settings = getSettings();
    }
  }
}
</script>

<style>

</style>