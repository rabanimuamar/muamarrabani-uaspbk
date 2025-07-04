import { defineStore } from 'pinia'
import nasgor from '@assets/nasgor-spesial.png'
import kopi from '@assets/kopi-hitam.png'
import mieAyam from '@assets/mie-ayam-bakso.png'
import jus from '@assets/jus-alpukat.png'
import roti from '@assets/roti-bakar.png'
import teh from '@assets/teh-es.png'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [
      {
        id: 1,
        nama: 'Nasi Goreng Spesial',
        kategori: 'Makanan',
        harga: 18000,
        gambar: nasgor
      },
      {
        id: 2,
        nama: 'Mie Ayam Bakso',
        kategori: 'Makanan',
        harga: 15000,
        gambar: mieAyam
      },
      {
        id: 3,
        nama: 'Es Teh Manis',
        kategori: 'Minuman',
        harga: 5000,
        gambar: teh
      },
      {
        id: 4,
        nama: 'Kopi Hitam',
        kategori: 'Minuman',
        harga: 7000,
        gambar: kopi
      },
      {
        id: 5,
        nama: 'Roti Bakar Coklat',
        kategori: 'Makanan',
        harga: 10000,
        gambar: roti
      },
      {
        id: 6,
        nama: 'Jus Alpukat',
        kategori: 'Minuman',
        harga: 12000,
        gambar: jus
      }
    ]
  }),

  getters: {
    makanan: (state) => state.menus.filter(menu => menu.kategori === 'Makanan'),
    minuman: (state) => state.menus.filter(menu => menu.kategori === 'Minuman'),
    byId: (state) => (id) => state.menus.find(menu => menu.id === id)
  }
})
