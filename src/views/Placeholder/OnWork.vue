<template>
  <ion-content class="mt4">
    <div class="center">
      <img class="mt2" :src="work" height="300" />
      <h5 class="mb0">Masih dalam pengerjaan...</h5>
      <h5 class="mt1">Soalnya gak ada yang bantu</h5>
    </div>
  </ion-content>
</template>

<script>
import work from "@/assets/work.svg";
import { IonContent } from "@ionic/vue";
export default {
  components: { IonContent },
  name: 'Empty',
  data() {
    return {
      work
    }
  }
}
</script>

<style>

</style>