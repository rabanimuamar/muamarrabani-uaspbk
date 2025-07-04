<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
    { to: '/', label: 'Menu', name: 'menu' },
    { to: '/keranjang', label: 'Keranjang', name: 'keranjang' },
    { to: '/pesanan', label: 'Pesanan', name: 'pesanan' },
    { to: '/profil', label: 'Profil', name: 'profil' }
]

const isActive = (path) => route.path === path
</script>

<template>
    <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <!-- Logo -->
                <div class="flex items-center space-x-3">
                    <img src="https://th.bing.com/th/id/OIP.iM5S5jUf98XX4x5oE57b7wHaHa?w=162&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="Logo" class="h-8 w-8" />
                    <span class="text-lg font-bold text-blue-600">Kedai Rasa</span>
                </div>

                <!-- Menu -->
                <div class="flex space-x-6">
                    <RouterLink v-for="item in navItems" :key="item.name" :to="item.to"
                        class="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 transition duration-150 ease-in-out"
                        :class="{
                            'text-blue-600 font-bold border-b-2 border-blue-500': isActive(item.to)
                        }">
                        {{ item.label }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </nav>
</template>
