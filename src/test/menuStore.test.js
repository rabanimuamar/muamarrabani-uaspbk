import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMenuStore } from '@/stores/menuStore'


describe('menuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should have 6 menu items in total', () => {
    const store = useMenuStore()
    expect(store.menus).toHaveLength(6)
  })

  it('getter makanan harus mengembalikan hanya item dengan kategori "Makanan"', () => {
    const store = useMenuStore()
    const makanan = store.makanan

    expect(makanan.length).toBeGreaterThan(0)
    expect(makanan.every(item => item.kategori === 'Makanan')).toBe(true)
  })

  it('getter minuman harus mengembalikan hanya item dengan kategori "Minuman"', () => {
    const store = useMenuStore()
    const minuman = store.minuman

    expect(minuman.length).toBeGreaterThan(0)
    expect(minuman.every(item => item.kategori === 'Minuman')).toBe(true)
  })

  it('getter byId harus mengembalikan menu sesuai ID', () => {
    const store = useMenuStore()
    const menu = store.byId(1)

    expect(menu).toBeDefined()
    expect(menu.nama).toBe('Nasi Goreng Spesial')
  })

  it('getter byId harus mengembalikan undefined jika ID tidak ditemukan', () => {
    const store = useMenuStore()
    const menu = store.byId(999)

    expect(menu).toBeUndefined()
  })
})
