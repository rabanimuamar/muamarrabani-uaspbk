import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000/transaksi'

export const useTransaksiStore = defineStore('transaksi', {
  state: () => ({
    transaksi: []
  }),

  getters: {
    // Hanya transaksi aktif (keranjang)
    keranjang(state) {
      return state.transaksi.find(t => !t.selesai) || null
    },

    // Transaksi selesai (riwayat)
    riwayat(state) {
      return state.transaksi.filter(t => t.selesai)
    },

    // Total harga keranjang
    totalKeranjang(state) {
      const keranjang = state.transaksi.find(t => !t.selesai)
      if (!keranjang) return 0
      return keranjang.items.reduce((total, item) => total + item.harga * item.jumlah, 0)
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
      let keranjang = this.transaksi.find(t => !t.selesai)

      if (!keranjang) {
        keranjang = {
          id: Date.now().toString(),
          items: [itemBaru],
          selesai: false
        }
        const res = await axios.post(API_URL, keranjang)
        this.transaksi.push(res.data)
      } else {
        const existing = keranjang.items.find(item => item.id === itemBaru.id)
        if (existing) {
          existing.jumlah += itemBaru.jumlah
        } else {
          keranjang.items.push(itemBaru)
        }
        await axios.put(`${API_URL}/${keranjang.id}`, keranjang)
        this.transaksi = this.transaksi.map(t => (t.id === keranjang.id ? keranjang : t))
      }
    },

    async hapusItem(idTransaksi, idItem) {
      const transaksi = this.transaksi.find(t => t.id === idTransaksi)
      if (!transaksi) return

      transaksi.items = transaksi.items.filter(item => item.id !== idItem)

      if (transaksi.items.length === 0) {
        await axios.delete(`${API_URL}/${idTransaksi}`)
        this.transaksi = this.transaksi.filter(t => t.id !== idTransaksi)
      } else {
        await axios.put(`${API_URL}/${idTransaksi}`, transaksi)
        this.transaksi = this.transaksi.map(t => (t.id === idTransaksi ? transaksi : t))
      }
    },

    async selesaikanTransaksi(idTransaksi) {
      const transaksi = this.transaksi.find(t => t.id === idTransaksi)
      if (!transaksi) return

      transaksi.selesai = true
      transaksi.tanggal = new Date().toISOString()

      await axios.put(`${API_URL}/${idTransaksi}`, transaksi)
      this.transaksi = this.transaksi.map(t => (t.id === idTransaksi ? transaksi : t))
    },

    async checkout() {
      const keranjang = this.transaksi.find(t => !t.selesai)
      if (!keranjang) return
      await this.selesaikanTransaksi(keranjang.id)
    }
  }
})
