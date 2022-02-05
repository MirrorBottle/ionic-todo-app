<template>
  <ion-page>
    <ion-content fullscreen :scroll-events="true">
      <ion-accordion-group>
        <ion-accordion value="colors">
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
        <ion-accordion value="shapes">
          <ion-item slot="header">
            <ion-label>Anggota Kelas</ion-label>
          </ion-item>

          <ion-list slot="content">
            <ion-item>
              <ion-label>Circle</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>Triangle</ion-label>
            </ion-item>
            <ion-item>
              <ion-label>Square</ion-label>
            </ion-item>
          </ion-list>
        </ion-accordion>
      </ion-accordion-group>

      <ion-button expand="block" color="danger" class="mt2">Logout</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonPage, IonContent, IonInput, IonButton } from '@ionic/vue';
import { schedules } from '@/utils/data';
export default {
  components: { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonPage, IonContent, IonInput, IonButton },
  data() {
    return {
      schedules,
      form: {}
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