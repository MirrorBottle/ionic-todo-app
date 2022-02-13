
import { toastController } from '@ionic/vue';
import { LocalNotifications } from "@capacitor/local-notifications"
import { schedules } from "./data";
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

export function storeNotifications(data) {
  localStorage.setItem('TODO_NOTIFICATIONS', JSON.stringify(data));
}

export function getNotifications() {
  return JSON.parse(localStorage.getItem('TODO_NOTIFICATIONS'))
}

export async function setNotifications() {
  const lectures = schedules.map(schedule => schedule.lectures).flatMap(lectures => lectures);
  const notifications = lectures.map(lecture => {
    const time = lecture.time.split("-")[0].split(".")
    const hour = Number(time[0]);
    const minute = Number(time[1])
    return {
      title: `${lecture.lecture}!`,
      body: `${lecture.lecture} akan dimulai 15 menit lagi!`,
      id: lecture.id,
      actionTypeId: "",
      extra: null,
      repeats: true,
      every: 'week',
      weekday: lecture.parent_id + 1,
      hour,
      minute
    }
  })
  await LocalNotifications.schedule({ notifications });
  storeNotifications(notifications);
  toast('Berhasil mengaktifkan notifikasi', 'success')
}

export async function clearNotifications() {
  const notifications = getNotifications();
  await LocalNotifications.cancel({ notifications });
  toast('Berhasil menonaktifkan notifikasi', 'success')
}


