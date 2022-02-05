<template>
  <ion-content :fullscreen="true">
    <ion-header collapse="condense">
      <ion-toolbar>
        <ion-title size="large">Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
  
    <ExploreContainer name="Tab 1 page" />
  </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import { IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { ExploreContainer, IonToolbar, IonTitle, IonContent }
});
</script>
