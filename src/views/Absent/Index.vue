<template>
  <ion-page class="ion-page flex align-center justify-start">
    <ion-segment @ionChange="handleSegmentChange" v-model="segment" class="pt1">
      <ion-segment-button value="absent">
        <ion-label>Absen</ion-label>
        <ion-icon :icon="calendarNumberOutline"></ion-icon>
      </ion-segment-button>
      <ion-segment-button value="history">
        <ion-label>Riwayat</ion-label>
        <ion-icon :icon="timerOutline"></ion-icon>
      </ion-segment-button>
    </ion-segment>

    <!-- CREATE ABSENT -->
    <template v-if="segment == 'absent'">
      <absent-create ref="AbsentCreate" />
    </template>
    <!-- ABSENT HISTORY -->
    <template v-else>
      <absent-history ref="AbsentHistory" />
    </template>
  </ion-page>
</template>

<script>
import { IonPage, IonSegment, IonSegmentButton, IonLabel, IonIcon } from "@ionic/vue";
import { calendarNumberOutline, timerOutline } from 'ionicons/icons';

import AbsentCreate from "./components/Create"
import AbsentHistory from "./components/History"
export default {
  components: { AbsentCreate, AbsentHistory, IonPage, IonSegment, IonSegmentButton, IonLabel, IonIcon },
  data() {
    return {
      calendarNumberOutline, timerOutline,
      segment: 'absent'
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.AbsentCreate.init();
    })
  },
  methods: {
    handleSegmentChange(val) {
      const ref = this.segment == 'history' ? 'AbsentHistory' : 'AbsentCreate';
      this.$nextTick(() => {
        this.$refs[ref].init();
      })
    }
  }

}
</script>

<style>

</style>