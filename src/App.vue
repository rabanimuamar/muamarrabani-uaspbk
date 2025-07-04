<script setup>
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Header from '@/components/Header.vue'

const route = useRoute()
</script>

<template>
  <Header v-if="route.path === '/'" />

  <Navbar />
  <router-view />
</template>
