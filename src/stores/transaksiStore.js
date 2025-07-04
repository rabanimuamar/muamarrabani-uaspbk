import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000/transaksi'

export const useTransaksiStore = defineStore('transaksi', {
  state: () => ({
    transaksi: []
  }),

  getters: {
    keranjang(state) {
      return state.transaksi.filter(t => !t.selesai)
    },

    riwayat(state) {
      return state.transaksi.filter(t => t.selesai)
    },

    totalKeranjang(state) {
      return state.transaksi
        .filter(t => !t.selesai)
        .reduce((total, t) => {
          return total + t.items.reduce((sum, item) => sum + item.harga * item.jumlah, 0)
        }, 0)
    }
  },

  actions: {
    async fetchTransaksi() {
      try {
        const res = await axios.get(API_URL)
        this.transaksi = res.data
      } catch (err) {
        console.error('Gagal mengambil transaksi:', err)
      }
    },

    async tambahItemKeKeranjang(itemBaru) {
      await this.fetchTransaksi()
      let keranjangAktif = this.transaksi.find(t => !t.selesai)

      // Jika belum ada keranjang aktif, buat baru
      if (!keranjangAktif) {
        keranjangAktif = {
          id: Date.now(),
          items: [itemBaru],
          selesai: false
        }
        const res = await axios.post(API_URL, keranjangAktif)
        this.transaksi.push(res.data)
      } else {
        // Tambah ke keranjang aktif
        const existingItem = keranjangAktif.items.find(item => item.id === itemBaru.id)
        if (existingItem) {
          existingItem.jumlah += itemBaru.jumlah
        } else {
          keranjangAktif.items.push(itemBaru)
        }
        await axios.put(`${API_URL}/${keranjangAktif.id}`, keranjangAktif)
        this.transaksi = this.transaksi.map(t => (t.id === keranjangAktif.id ? keranjangAktif : t))
      }
    },

    async hapusItemKeranjang(idTransaksi, idItem) {
      const transaksi = this.transaksi.find(t => t.id === idTransaksi)
      if (!transaksi) return

      transaksi.items = transaksi.items.filter(item => item.id !== idItem)

      await axios.put(`${API_URL}/${idTransaksi}`, transaksi)
      this.transaksi = this.transaksi.map(t => (t.id === idTransaksi ? transaksi : t))
    },

    async selesaikanTransaksi(idTransaksi) {
      const transaksi = this.transaksi.find(t => t.id === idTransaksi)
      if (!transaksi) return

      transaksi.selesai = true
      transaksi.tanggal = new Date().toISOString()

      await axios.put(`${API_URL}/${idTransaksi}`, transaksi)
      this.transaksi = this.transaksi.map(t => (t.id === idTransaksi ? transaksi : t))
    }
  }
})
