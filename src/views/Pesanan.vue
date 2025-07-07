<script setup>
import { useTransaksiStore } from '@/stores/transaksiStore'
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
})

const riwayat = computed(() => transaksiStore.riwayat)
</script>

<template>
  <div class="p-6 min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-50">
    <!-- Header -->
    <div class="text-center mb-8 animate-fade-in">
      <h1 class="text-4xl font-bold text-gray-800 mb-3 tracking-wide">📋 Riwayat Pesanan</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Lihat semua pesanan yang telah Anda selesaikan
      </p>
      
      <!-- Stats Badge -->
      <div class="flex justify-center mt-4">
        <div class="bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-blue-100">
          <span class="text-sm font-medium text-blue-700">{{ riwayat.length }} Pesanan Selesai</span>
        </div>
      </div>
    </div>

    <!-- Riwayat List -->
    <div v-if="riwayat.length > 0" class="max-w-4xl mx-auto space-y-6">
      <div
        v-for="transaksi in riwayat.reverse()"
        :key="transaksi.id"
        class="bg-white border border-gray-200 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
      >
        <!-- Header Transaksi -->
        <div class="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-1">
              Order #{{ transaksi.id }}
            </h2>
            <div class="flex items-center gap-2">
              <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                ✅ Selesai
              </span>
              <span class="text-sm text-gray-500">
                {{ new Date(transaksi.tanggal).toLocaleString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">Total Items</p>
            <p class="text-lg font-bold text-blue-600">{{ transaksi.items.length }}</p>
          </div>
        </div>

        <!-- Items List -->
        <div class="space-y-3 mb-4">
          <div
            v-for="item in transaksi.items"
            :key="item.id"
            class="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800 mb-1">{{ item.nama }}</h3>
              <div class="flex items-center gap-3">
                <div class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  {{ item.jumlah }}x
                </div>
                <span class="text-sm text-gray-500">@ Rp {{ item.harga.toLocaleString() }}</span>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-blue-600">
                Rp {{ (item.harga * item.jumlah).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>

        <!-- Total Section -->
        <div class="border-t border-gray-200 pt-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-500">Total Pembayaran</p>
              <p class="text-xs text-gray-400">Termasuk semua biaya</p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-gray-800">
                Rp {{ transaksi.items.reduce((sum, item) => sum + item.harga * item.jumlah, 0).toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center mt-12 animate-fade-in">
      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-4xl">📋</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Belum Ada Riwayat</h2>
          <p class="text-gray-600 mb-6">
            Anda belum memiliki pesanan yang diselesaikan. Mulai berbelanja sekarang untuk membuat pesanan pertama Anda!
          </p>
          <div class="space-y-2 text-sm text-gray-500 mb-6">
            <p>🍽️ Pilih menu favorit Anda</p>
            <p>🛒 Tambahkan ke keranjang</p>
            <p>✅ Konfirmasi pesanan</p>
            <p>📋 Lihat riwayat di sini</p>
          </div>
          
          <button 
            @click="router.push('/')"
            class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            🍽️ Mulai Belanja
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>