<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>{{ $router.currentRoute.value.name }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonToolbar, IonTitle, IonHeader } from "@ionic/vue";
export default {
  components: { IonToolbar, IonTitle, IonHeader },
  name: 'Header'
}
</script>

<style>

</style>