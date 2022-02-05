<template>
  <ion-page>
    <div class="reload-container">
      <ion-button @click="doRefresh" size="small">
        <ion-icon :icon="refreshOutline"></ion-icon>
        Reload
      </ion-button>
    </div>
    <ion-content fullscreen :scroll-events="true">
      <ion-list>
        <ion-item-sliding v-for="note in notes" :key="note.id">
          <ion-item button @click="handleItemClick(note)">
            <ion-label>
              <h2>{{note.title}}</h2>
              <p>{{note.description}}</p>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <!-- <ion-item-option color="warning" @click="unread(item)">
              <ion-icon slot="icon-only" :icon="pencilOutline"></ion-icon>
            </ion-item-option> -->
            <ion-item-option @click="handleDeleteClick(note)" color="danger">
              <ion-icon slot="icon-only" :icon="trashBinOutline"></ion-icon>
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
    
    <ion-loading
      :is-open="isLoading"
      message="Please wait..."
    />
  </ion-page>
</template>

<script>
import { copyText } from 'vue3-clipboard'
import { pencilOutline, trashBinOutline, refreshOutline } from 'ionicons/icons';
import { 
  IonPage, 
  IonLoading, 
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonLabel,
  IonButton,
  IonContent,
} from '@ionic/vue';

import NoteResource from '@/api/note';

const noteResource  = new NoteResource();
export default {
  name: 'NoteIndex',
  components: {
    IonPage, 
    IonLoading, 
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonButton,
    IonContent,
  },
  data() {
    return {
      pencilOutline, trashBinOutline, refreshOutline,
      notes: [],
      isLoading: true,
    }
  },
  async created() {
    const { data } = await noteResource.list();
    this.notes = data;
    this.isLoading = false;
  },
  methods: {
    async doRefresh() {
      this.isLoading = true;
      const { data } = await noteResource.list();
      this.notes = data;
      this.isLoading = false;
    },
    handleItemClick(note) {
      copyText(note.description, undefined, (error) => {
        if (error) {
          alert('Can not copy')
        } else {
          alert('Copied')
        }
      })
    },
    handleDeleteClick(note) {
      this.isLoading = true;
      noteResource
        .destroy(note.id)
        .then(() => {
          this.doRefresh();
        })
        .catch(() => {
          this.doRefresh();
        })
    }
  }
}
</script>

<style lang="scss" scoped>
ion-content {
  overflow: hidden;
}
ion-list {
  padding-bottom: 5rem;
}
.ion-page {
  justify-content: flex-start!important;
}
.reload-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: right;
  padding-right: 1rem;
  z-index: 999;
}
.empty-state {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>