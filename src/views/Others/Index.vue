<template>
  <ion-page>
    <ion-content fullscreen :scroll-events="true">
      <div class="header">
        <img :src="logo" alt="Ionic logo">
      </div>

      <ion-accordion-group @ionChange="handleAccordionChange">
        <ion-accordion value="schedules">
          <ion-item slot="header">
            <ion-icon :icon="calendarClearSharp" class="mr1"></ion-icon>
            <ion-label>Jadwal</ion-label>
          </ion-item>

          <ion-list slot="content">
            <ion-item v-for="schedule in schedules" :key="schedule.id">
              <div class="schedule">
                <p>{{schedule.day}}</p>
                <div class="schedule-lectures">
                  <div class="schedule-lecture" v-for="lecture in schedule.lectures">
                    <p class="schedule-lecture-title">{{lecture.lecture}} ({{lecture.time}})</p>
                    <p class="schedule-lecture-body">{{lecture.room}}</p>
                  </div>
                </div>
              </div>
            </ion-item>
          </ion-list>
        </ion-accordion>

        <ion-accordion value="members">
          <ion-item slot="header">
            <ion-icon :icon="peopleCircleSharp" class="mr1"></ion-icon>
            <ion-label>Anggota Kelas</ion-label>
          </ion-item>

          <ion-list slot="content">
            <template v-if="members.length > 0">
              <ion-item v-for="member in members">
                <ion-label>
                  <h3>{{member.name}}</h3>
                  <p>{{member.nim}}</p>
                </ion-label>
              </ion-item>
            </template>
            <skeleton v-else />
          </ion-list>
        </ion-accordion>

        <ion-accordion value="lecturers">
          <ion-item slot="header">
            <ion-icon :icon="bookSharp" class="mr1"></ion-icon>
            <ion-label>Dosen</ion-label>
          </ion-item>

          <ion-list slot="content">
            <ion-item-group>
              <template v-for="lecturer in lecturers">
                <ion-item-divider>
                  <ion-label>{{lecturer.lecture_name}}</ion-label>
                </ion-item-divider>

                <ion-item v-for="lecture_data in lecturer.lecturers">
                  <ion-label>{{lecture_data.name}}</ion-label>
                </ion-item>
              </template>
            </ion-item-group>
          </ion-list>
        </ion-accordion>

        <ion-accordion value="theme">
          <ion-item slot="header">
            <ion-icon :icon="settingsSharp" class="mr1"></ion-icon>
            <ion-label>Pengaturan</ion-label>
          </ion-item>

          <ion-list slot="content">
            <ion-item>
              <ion-label>Notifikasi</ion-label>
              <ion-toggle :checked="settings.notification == 'on'" @ionChange="handleNotificationChange($event)"></ion-toggle>
            </ion-item>
            <ion-item>
              <ion-label>Tema</ion-label>
              <ion-select v-model="settings.theme" @ionChange="handleThemeChange">
                <ion-select-option v-for="theme in themes" :key="theme.val" :value="theme.val">{{theme.name}}</ion-select-option>
              </ion-select>
            </ion-item>
            
          </ion-list>
        </ion-accordion>

        <ion-accordion value="help">
          <ion-item slot="header">
            <ion-icon :icon="helpCircleSharp" class="mr1"></ion-icon>
            <ion-label>Bantuan</ion-label>
          </ion-item>
          
          <ion-list slot="content">
            <ion-item>
              <p>Hubungi orang dengan NIM <b>2109106001</b> dan <b>2109106024</b>, seharusnya kamu kenal dengan mereka.</p>
            </ion-item>
          </ion-list>
        </ion-accordion>

        <ion-accordion value="about">
          <ion-item slot="header">
            <ion-icon :icon="informationCircleSharp" class="mr1"></ion-icon>
            <ion-label>Tentang</ion-label>
          </ion-item>
          <ion-list slot="content">
            <ion-item>
              <p>Made with 💖 by <b>Bayu Setiawan</b> and <b>You</b></p>
            </ion-item>
            <ion-item>
              <ion-label><b>Email</b> : setiawanbayu66152@gmail.com</ion-label>
            </ion-item>
            <ion-item>
              <ion-label><b>Github</b> : <a href="#" onclick="window.open('https://github.com/MirrorBottle', '_system', 'location=yes'); return false;">MirrorBottle</a></ion-label>
            </ion-item>
          </ion-list>
        </ion-accordion>

      </ion-accordion-group>
      <ion-button expand="block" color="danger" class="mt2" @click="handleLogout">Logout</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import logo from "@/assets/logo.jpg"
import {
  settingsSharp,
  peopleCircleSharp,
  bookSharp,
  calendarClearSharp,
  informationCircleSharp,
  helpCircleSharp,
} from "ionicons/icons";
import { alertController, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonPage, IonContent, IonInput, IonButton, IonList, IonSkeletonText, IonToggle, IonItemGroup, IonItemDivider, IonSelect, IonSelectOption } from '@ionic/vue';
import { schedules, lecturers, settings } from '@/utils/data';
import { getSettings, setSettings, clearNotifications, setNotifications } from '@/utils/helper';
import Skeleton from "@/views/Placeholder/Skeleton";

import UserResource from '@/api/users';

const userResource = new UserResource();

export default {
  components: { alertController, Skeleton, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonPage, IonContent, IonInput, IonButton, IonList, IonSkeletonText, IonToggle, IonItemGroup, IonItemDivider, IonSelect, IonSelectOption },
  data() {
    return {
      logo,
      settingsSharp,
      peopleCircleSharp,
      bookSharp,
      calendarClearSharp,
      informationCircleSharp,
      helpCircleSharp,
      schedules,
      lecturers,
      members: [],
      themes: [
        { name: 'Default', val: 'light' },
        { name: 'Dark', val: 'dark' },
        { name: 'Pastel', val: 'pastel' },
        { name: 'Neutral', val: 'neutral' },
        { name: 'Pink Lover', val: 'pink-lover' },
        { name: 'Bluish', val: 'bluish' },
        { name: 'Earthy', val: 'earthy' },
      ],
      settings: getSettings()
    }
  },
  methods: {
    async handleAccordionChange({ detail }) {
      if(detail.value == 'members' && this.members.length < 1) {
        const { data: members } = await userResource.list();
        this.members = members;
      }
    },
    handleNotificationChange(event) {
      if(event.detail.checked) {
        setNotifications();
      } else {
        clearNotifications();
      }
      setSettings(this.settings);
    },
    handleThemeChange() {
      document.body.setAttribute('color-theme', this.settings.theme)
      setSettings(this.settings);
    },
    async handleLogout() {
      const alert = await alertController
        .create({
          header: 'Yakin?',
          message: 'Kalau keluar nanti harus login lagi...',
          buttons: [
            {
              text: 'Gak jadi',
              role: 'cancel',
              cssClass: 'secondary',
              id: 'cancel-button',
            },
            {
              text: 'Ya',
              id: 'confirm-button',
              handler: () => {
                setSettings(settings)
                clearNotifications();
                localStorage.removeItem("TODO_USER");
                this.$router.push('/login');
              },
            },
          ],
        });
      return alert.present();
    }
  } 
}
</script>

<style lang="scss" scoped>
  .header {
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 10rem;
    }
  }
  .schedule {
    .schedule-lectures {
      margin-top: 10px;
      .schedule-lecture {
        .schedule-lecture-title {
          font-size: 15px;
          margin-bottom: 0px;
          font-weight: bold;
        }
        .schedule-lecture-body {
          font-size: 12px;
          margin-top: 3px;
        }
      }
    }
  }
</style>