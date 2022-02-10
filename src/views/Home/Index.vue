<template>
  <ion-page class="ion-page px2">
    <h3><b>Hi</b>, {{user.name}}</h3>
    <on-work />
  </ion-page>
</template>

<script>
import { IonPage } from "@ionic/vue";
import { user as getUser } from "@/utils/helper";
import OnWork from "@/views/Placeholder/OnWork";
export default {
  components: { IonPage, OnWork},
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