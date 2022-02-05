<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>{{ $router.currentRoute.value.name }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>

</style>