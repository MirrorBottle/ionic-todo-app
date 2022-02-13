
import { toastController } from '@ionic/vue';
// UX
export async function toast(message, color = 'primary') {
  const toast = await toastController
    .create({
      message,
      color,
      duration: 2000
    })
  return toast.present();
}

// LOCAL STORAGE
export function user(key = null) {
  const user = localStorage.getItem('TODO_USER');
  if(user && user !== undefined) {
    const data = JSON.parse(user);
    return key ? data[key] : data;
  }
  return {};
}

export function getLectures() {
  const lectures = localStorage.getItem('TODO_LECTURES');
  if(lectures && lectures !== undefined) {
    return JSON.parse(lectures);
  }
  return [];
}

export function setLectures(data) {
  localStorage.setItem('TODO_LECTURES', JSON.stringify(data));
}

export function getSettings(key) {
  const settings = localStorage.getItem('TODO_SETTINGS');
  if(settings && settings !== undefined) {
    const data = JSON.parse(settings);
    return key ? data[key] : data;
  }
  return {};
}

export function setSettings(data) {
  localStorage.setItem('TODO_SETTINGS', JSON.stringify(data));
}

export function setNotifications() {

}