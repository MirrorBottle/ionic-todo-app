<template>
  <div>
    <ion-item v-for="iteration in  Array.from({length: iterations}, (_, i) => i + 1)" :key="iteration">
      <ion-label>
        <h3><ion-skeleton-text animated style="width: 50%"></ion-skeleton-text></h3>
        <p><ion-skeleton-text animated style="width: 80%"></ion-skeleton-text></p>
      </ion-label>
    </ion-item>
  </div>
</template>

<script>
import { IonItem, IonLabel, IonSkeletonText } from "@ionic/vue";
export default {
  components: { IonItem, IonLabel, IonSkeletonText },
  name: 'Skeleton',
  props: {
    iterations: {
      type: Number,
      default: 3
    }
  }
}
</script>

<style>

</style>