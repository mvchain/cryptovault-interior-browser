<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view :permission="permission" :manage="manage" :adminType="adminType"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      permission: window.localStorage.getItem('permission'),
      manage: {},
      adminType: window.localStorage.getItem('adminType')
    }
  },
  mounted() {
    const us = window.localStorage.getItem('user')
    if (us) {
      this.manage = JSON.parse(us)
    }
  }
}
</script>
