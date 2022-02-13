<template>
  <ion-page>
    <ion-content>
      <div class="login-logo">
        <img :src="logo" alt="Ionic logo">
      </div>
      <ion-card class="p1 pb3">
        <ion-card-header class="text-center flex justify-center items-center">
          <ion-card-title>Login</ion-card-title>
        </ion-card-header>
        <ion-list>
          <ion-item>
            <ion-label position="stacked" color="primary">NIM</ion-label>
            <ion-input
              v-model="form.nim"
              autocapitalize="off"
              required
            ></ion-input>
          </ion-item>
        </ion-list>
        <ion-button @click="handleLogin" expand="block">Login</ion-button>
      </ion-card>
    </ion-content>
    <ion-loading
      :is-open="isLoading"
      message="Please wait..."
    />
  </ion-page>
</template>

<script>
import logo from "@/assets/logo.jpg"
import { settings } from "@/utils/data";
import { setSettings } from "@/utils/helper";
import { alertController, IonInput, IonListHeader, IonList, IonLabel, IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLoading } from "@ionic/vue";
import AuthResource from "@/api/auth";

const authResource = new AuthResource();
export default {
  components: { IonInput, IonListHeader, IonList, IonLabel, IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonLoading },
  data() {
    return {
      logo,
      isLoading: false,
      form: {
        nim: ''
      }
    }
  },
  beforeCreate() {
    const user = localStorage.getItem('TODO_USER');
		if(user) {
			this.$router.push('/tabs/home');
		}
  },
  methods: {
    handleLogin() {
      this.isLoading = true;
      authResource
        .login(this.form)
        .then(({ user }) => {
          setSettings(settings);
          document.body.setAttribute('color-theme', settings.theme);
          localStorage.setItem('TODO_USER', JSON.stringify(user))
          this.$router.push('/tabs/home');
        })
        .catch(async(err) => {
          console.log(err);
          if(err.response) {
            const message = err.response.status == 404 ? 'Data NIM tidak ada!' : 'Terjadi kesalahan. Mohon coba sekali lagi!';
            const alert = await alertController
              .create({
                header: 'Gagal!',
                message,
                buttons: ['OK'],
              });
            await alert.present();
          }
        })
        .finally(() => {
          this.isLoading = false;
        })
      
    }
  }
}
</script>

<style lang="scss" scoped>
.login-logo {
  padding: 20px 0;
  min-height: 200px;
  text-align: center;
}
.login-logo img {
  max-width: 150px;
}
.list {
  margin-bottom: 0;
}
</style>