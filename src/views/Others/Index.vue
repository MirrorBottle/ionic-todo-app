<template>
  <ion-page>
    <ion-content fullscreen :scroll-events="true">
      <ion-accordion-group @ionChange="handleAccordionChange">
        <ion-accordion value="schedules">
          <ion-item slot="header">
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
            <template v-else>
              <ion-item>
                <ion-label>
                  <h3><ion-skeleton-text animated style="width: 50%"></ion-skeleton-text></h3>
                  <p><ion-skeleton-text animated style="width: 80%"></ion-skeleton-text></p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label>
                  <h3><ion-skeleton-text animated style="width: 50%"></ion-skeleton-text></h3>
                  <p><ion-skeleton-text animated style="width: 80%"></ion-skeleton-text></p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-label>
                  <h3><ion-skeleton-text animated style="width: 50%"></ion-skeleton-text></h3>
                  <p><ion-skeleton-text animated style="width: 80%"></ion-skeleton-text></p>
                </ion-label>
              </ion-item>
            </template>
          </ion-list>
        </ion-accordion>

        <ion-accordion value="use">
          <ion-item slot="header">
            <ion-label>Cara Pakai</ion-label>
          </ion-item>

          <ion-list slot="content">
            <ion-item>
              <ion-label>
                <i><b>Tinggal pakai</b></i>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-accordion>
      </ion-accordion-group>

      <ion-button expand="block" color="danger" class="mt2">Logout</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonPage, IonContent, IonInput, IonButton, IonList, IonSkeletonText } from '@ionic/vue';
import { schedules } from '@/utils/data';

import UserResource from '@/api/users';

const userResource = new UserResource();

export default {
  components: { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonPage, IonContent, IonInput, IonButton, IonList, IonSkeletonText },
  data() {
    return {
      schedules,
      members: []
    }
  },
  methods: {
    async handleAccordionChange({ detail }) {
      if(detail.value == 'members' && this.members.length < 1) {
        const { data: members } = await userResource.list();
        this.members = members;
      }
    }
  } 
}
</script>

<style lang="scss">
  .schedule {
    .schedule-lectures {
      margin-top: 10px;
      .schedule-lecture {
        .schedule-lecture-title {
          font-size: 15px;
          color: #ddd;
          margin-bottom: 0px;
          font-weight: bold;
        }
        .schedule-lecture-body {
          font-size: 12px;
          color: #eee;
          margin-top: 3px;
        }
      }
    }
  }
</style>