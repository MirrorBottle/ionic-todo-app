<template>
  <ion-content>
    <div class="center">
      <img class="title-image" :src="empty" height="300" />
      <h5 class="mb0">Kosong nih...</h5>
    </div>
  </ion-content>
</template>

<script>
import empty from "@/assets/empty.svg";
import { IonContent } from "@ionic/vue";
export default {
  components: { IonContent },
  name: 'Empty',
  data() {
    return {
      empty
    }
  }
}
</script>

<style>

</style>