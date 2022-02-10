<template>
  <ion-content>
    <ion-list>
      <ion-item>
        <ion-label>Pilih Bulan</ion-label>
        <ion-select interface="popover" v-model="selectedMonth" @ionChange="handleFilterDateChange">
          <ion-select-option v-for="range in ranges" :value="range">{{moment(range, 'YYYY-MM').format('MMMM YYYY')}}</ion-select-option>
        </ion-select>
      </ion-item>
    </ion-list>

    <ion-list v-if="absents.length > 0">
        <!-- <ion-list-header class="text-muted">{{ moment(absent.date).format('dddd, DD MMM YYYY') }}</ion-list-header> -->
      <ion-item-group>
        <template v-for="absent in absents" :key="absent.date">
          <ion-item-divider>
            <ion-label>{{ moment(absent.date).format('dddd, DD MMM YYYY') }}</ion-label>
          </ion-item-divider>
          <ion-item v-for="data in absent.absents" :key="data.id">
            <ion-label>
              <h2>{{data.lecture_name}}</h2>
              <h3>Pertemuan : {{data.meeting}}</h3>
            </ion-label>
            <ion-note slot="end">
              {{data.created_time}}
            </ion-note>
          </ion-item>
        </template>
      </ion-item-group>
    </ion-list>

    <empty v-else />
  </ion-content>
  <ion-loading
    :is-open="isLoading"
    message="Please wait..."
  />
</template>

<script>
import AbsentResource from '@/api/absent';
import { user as getUser } from '@/utils/helper';
import moment from 'moment';

import { IonList, IonListHeader, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonContent, IonLoading, IonDatetime, IonItemGroup } from "@ionic/vue";
import Empty from "@/views/Placeholder/Empty";
const absentResource = new AbsentResource();
export default {
  components: { 
    Empty,
    IonList, IonListHeader, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonContent, IonLoading, IonDatetime, IonItemGroup },
  data() {
    return {
      isLoading: false,
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYYY-MM-DD'),
      selectedMonth: moment().format('YYYY-MM'),
      absents: []
    }
  },
  computed: {
    ranges() {
      const years = ['2022'];
      const months = Array.from({length: 12}, (_, i) => i <= 8 ? `0${i + 1}` : `${i + 1}`)
      const dates = years.map(year => months.map(month => `${year}-${month}`)).flatMap(date => date);
      return dates;
    }
  },
  methods: {
    moment,
    async fetch() {
      this.isLoading = true;
      const user_id = getUser('id');
      const params = {
        user_id,
        start_date: this.startDate,
        end_date: this.endDate
      }
      const { data: absents } = await absentResource.list(params)
      const dates = [...new Set(absents.map(absent => absent.created_at))]
      this.absents = dates.map(date => ({ date, absents: absents.filter(absent => absent.created_at == date)}))
      this.isLoading = false;
    },
    async init() {
      this.fetch();
    },
    handleFilterDateChange() {
      this.startDate = `${this.selectedMonth}-01`;
      this.endDate = moment(this.startDate).endOf('month').format('YYYYY-MM-DD');
      this.fetch();
    },
  }
}
</script>

<style lang="scss" scoped>
.text-muted {
  color: #ddd;
}
</style>