<script setup>
import { useTransaksiStore } from '@/stores/transaksiStore'
import { computed, onMounted } from 'vue'

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchTransaksi()
})

const keranjang = computed(() => transaksiStore.keranjang)
const total = computed(() => transaksiStore.totalKeranjang)

const hapusItem = (idItem) => {
  if (keranjang.value) {
    transaksiStore.hapusItem(keranjang.value.id, idItem)
  }
}

const checkout = async () => {
  if (keranjang.value) {
    await transaksiStore.checkout()
    alert('Pesanan berhasil dikonfirmasi!')
  }
}
</script>

<template>
  <div class="p-6 min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-50">
    <!-- Header -->
    <div class="text-center mb-8 animate-fade-in">
      <h1 class="text-4xl font-bold text-gray-800 mb-3 tracking-wide">🛒 Keranjang Belanja</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Periksa pesanan Anda sebelum melanjutkan ke pembayaran
      </p>
    </div>

    <!-- Jika ada item di keranjang -->
    <div v-if="keranjang && keranjang.items.length > 0" class="max-w-4xl mx-auto">
      <!-- Items List -->
      <div class="space-y-4 mb-8">
        <div
          v-for="item in keranjang.items"
          :key="item.id"
          class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ item.nama }}</h3>
              <div class="flex items-center gap-4 mb-3">
                <div class="bg-blue-50 rounded-full px-3 py-1">
                  <span class="text-sm font-medium text-blue-700">{{ item.jumlah }} item</span>
                </div>
                <div class="text-gray-500">
                  <span class="text-sm">@ Rp {{ item.harga.toLocaleString() }}</span>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-600">Subtotal:</span>
                <span class="text-2xl font-bold text-blue-600">
                  Rp {{ (item.harga * item.jumlah).toLocaleString() }}
                </span>
              </div>
            </div>
            
            <button
              @click="hapusItem(item.id)"
              class="ml-4 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 border border-red-200 hover:border-red-300"
            >
              🗑️ Hapus
            </button>
          </div>
        </div>
      </div>

      <!-- Summary Section -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">Ringkasan Pesanan</h3>
          <div class="bg-blue-50 rounded-full px-3 py-1">
            <span class="text-sm font-medium text-blue-700">{{ keranjang.items.length }} item</span>
          </div>
        </div>
        
        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>Rp {{ total.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Biaya Layanan</span>
            <span>Gratis</span>
          </div>
          <div class="border-t pt-3">
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-gray-800">Total</span>
              <span class="text-2xl font-bold text-blue-600">Rp {{ total.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkout Button -->
      <div class="text-center">
        <button
          @click="checkout"
          class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-64"
        >
          ✅ Konfirmasi Pesanan
        </button>
        <p class="text-gray-500 text-sm mt-3">
          Dengan mengkonfirmasi pesanan, Anda menyetujui syarat dan ketentuan yang berlaku
        </p>
      </div>
    </div>

    <!-- Jika keranjang kosong -->
    <div v-else class="text-center mt-12 animate-fade-in">
      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-4xl">🛒</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-3">Keranjang Kosong</h2>
          <p class="text-gray-600 mb-6">
            Belum ada item dalam keranjang Anda. Mulai berbelanja sekarang untuk menemukan makanan dan minuman favorit!
          </p>
          <div class="space-y-2 text-sm text-gray-500">
            <p>💡 Tips: Jelajahi menu kami yang beragam</p>
            <p>🍽️ Tambahkan item ke keranjang</p>
            <p>✨ Nikmati pengalaman belanja yang mudah</p>
          </div>
        </div>
        
        <router-link 
          to="/" 
          class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          🍽️ Lihat Menu
        </router-link>
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