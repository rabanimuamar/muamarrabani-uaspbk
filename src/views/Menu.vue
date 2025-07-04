<script setup>
import { ref, computed } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
import { useTransaksiStore } from '@/stores/transaksiStore'

const menuStore = useMenuStore()
const transaksiStore = useTransaksiStore()

// Modal state
const showModal = ref(false)
const selectedItem = ref(null)
const jumlah = ref(1)

// Modal functions
const openModal = (menu) => {
    selectedItem.value = menu
    jumlah.value = 1
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    selectedItem.value = null
    jumlah.value = 1
}

const konfirmasiPesanan = async () => {
    if (!selectedItem.value || jumlah.value < 1) return

    const item = {
        id: selectedItem.value.id,
        nama: selectedItem.value.nama,
        harga: selectedItem.value.harga,
        jumlah: jumlah.value
    }

    await transaksiStore.tambahItemKeKeranjang(item)
    closeModal()
    alert(`${item.nama} sebanyak ${item.jumlah} ditambahkan ke keranjang.`)
}

// Statistik
const totalMakanan = computed(() => menuStore.makanan.length)
const totalMinuman = computed(() => menuStore.minuman.length)
const totalMenu = computed(() => totalMakanan.value + totalMinuman.value)
</script>

<template>
    <div class="p-20 bg-gradient-to-br from-white via-sky-50 to-blue-50 min-h-screen">
        <!-- Header -->
        <div class="text-center mb-8 animate-fade-in">
            <h1 class="text-4xl font-bold text-gray-800 mb-3 tracking-wide">✨ Menu Makanan & Minuman ✨</h1>
            <p class="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
                Temukan cita rasa terbaik dari koleksi menu pilihan kami. Dibuat dengan bahan berkualitas dan penuh
                cinta!
            </p>

            <div class="flex justify-center gap-4 mb-6 flex-wrap">
                <div
                    class="bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-blue-100 transform hover:scale-105 transition-all duration-300">
                    <span class="text-sm font-medium text-blue-700">{{ totalMenu }} Menu Tersedia</span>
                </div>
                <div
                    class="bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-blue-100 transform hover:scale-105 transition-all duration-300">
                    <span class="text-sm font-medium text-green-700">✅ Halal & Higienis</span>
                </div>
                <div
                    class="bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-blue-100 transform hover:scale-105 transition-all duration-300">
                    <span class="text-sm font-medium text-orange-700">🔥 Fresh Daily</span>
                </div>
            </div>
        </div>

        <!-- Section Makanan -->
        <section class="mb-12">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">🍽️ Makanan Lezat</h2>
                    <p class="text-gray-600">Nikmati berbagai hidangan spesial yang menggugah selera</p>
                </div>
                <div
                    class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {{ totalMakanan }} Pilihan
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                <div v-for="menu in menuStore.makanan" :key="menu.id"
                    class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col hover:shadow-xl transition-all duration-300 transform hover:scale-105 group mx-auto w-full">
                    <div class="relative overflow-hidden rounded-lg mb-4">
                        <img :src="menu.gambar" :alt="menu.nama"
                            class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div
                            class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
                            <span class="text-xs font-medium text-gray-700">{{ menu.kategori }}</span>
                        </div>
                    </div>

                    <div class="flex-1 flex flex-col">
                        <h3 class="text-xl font-bold text-gray-800 mb-2">{{ menu.nama }}</h3>
                        <p class="text-sm text-gray-500 mb-3 flex-1">Hidangan berkualitas dengan cita rasa autentik</p>

                        <div class="flex items-center justify-between mb-4">
                            <p class="text-2xl font-bold text-blue-600">Rp {{ menu.harga.toLocaleString() }}</p>
                            <div class="flex items-center gap-1">
                                <span class="text-yellow-400">⭐</span>
                                <span class="text-sm text-gray-600">4.8</span>
                            </div>
                        </div>

                        <button @click="openModal(menu)"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                            🛒 Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Minuman -->
        <section>
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">🥤 Minuman Segar</h2>
                    <p class="text-gray-600">Minuman segar dan menyegarkan untuk menemani hari Anda</p>
                </div>
                <div
                    class="bg-gradient-to-r from-sky-500 to-sky-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {{ totalMinuman }} Pilihan
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="menu in menuStore.minuman" :key="menu.id"
                    class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                    <div class="relative overflow-hidden rounded-lg mb-4">
                        <img :src="menu.gambar" :alt="menu.nama"
                            class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div
                            class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
                            <span class="text-xs font-medium text-gray-700">{{ menu.kategori }}</span>
                        </div>
                    </div>

                    <div class="flex-1 flex flex-col">
                        <h3 class="text-xl font-bold text-gray-800 mb-2">{{ menu.nama }}</h3>
                        <p class="text-sm text-gray-500 mb-3 flex-1">Minuman berkualitas dengan rasa yang menyegarkan
                        </p>

                        <div class="flex items-center justify-between mb-4">
                            <p class="text-2xl font-bold text-blue-600">Rp {{ menu.harga.toLocaleString() }}</p>
                            <div class="flex items-center gap-1">
                                <span class="text-yellow-400">⭐</span>
                                <span class="text-sm text-gray-600">4.7</span>
                            </div>
                        </div>

                        <button @click="openModal(menu)"
                            class="w-full bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                            🛒 Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Modal -->
        <div v-if="showModal"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform scale-100 animate-modal-enter">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">🛒</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Konfirmasi Pesanan</h2>
                    <p class="text-gray-600">Atur jumlah pesanan Anda</p>
                </div>

                <div class="bg-gray-50 rounded-xl p-4 mb-6">
                    <p class="text-gray-700 mb-1"><strong>Menu:</strong> {{ selectedItem?.nama }}</p>
                    <p class="text-blue-600 font-bold text-lg">Rp {{ selectedItem?.harga.toLocaleString() }}</p>
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Jumlah</label>
                    <input v-model.number="jumlah" type="number" min="1"
                        class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200" />
                </div>

                <div class="flex gap-3">
                    <button @click="closeModal"
                        class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                        Batal
                    </button>
                    <button @click="konfirmasiPesanan"
                        class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                        Tambah ke Keranjang
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
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes modal-enter {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out;
}

.animate-modal-enter {
    animation: modal-enter 0.3s ease-out;
}

</style>
