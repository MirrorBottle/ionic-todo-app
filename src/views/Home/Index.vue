<template>
  <ion-page class="ion-page px2">
    <ion-content>
      <h3 class="mb2"><b>Hi</b>, {{user.name}}</h3>
      <ion-card class="mx0 mb2" color="primary">
        <ion-card-header>
          <ion-card-subtitle>Pengumuman</ion-card-subtitle>
          <ion-card-title>Lorem, ipsum dolor.</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Founded in 1829 on an isthmus between Lake Monona and Lake Mendota
        </ion-card-content>
      </ion-card>

      <ion-card class="mx0 mb2" color="tertiary">
        <ion-card-header>
          <ion-card-subtitle>Senin, 29 Februari 2022</ion-card-subtitle>
          <ion-card-title>Jadwal Hari Ini</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Founded in 1829 on an isthmus between Lake Monona and Lake Mendota
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from "@ionic/vue";
import { user as getUser } from "@/utils/helper";
import OnWork from "@/views/Placeholder/OnWork";
export default {
  name: 'HomeIndex',
  displayName: 'HomeIndex',
  components: { OnWork, IonContent, IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent },
  computed: {
    user() {
      const user = getUser();
      return user;
    }
  }
}
</script>

<style>

</style>