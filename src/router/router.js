import { createRouter, createWebHistory } from "vue-router";
import Keranjang from "@/views/Keranjang.vue";
import Menu from "@/views/Menu.vue";
import Pesanan from "@/views/Pesanan.vue";
import Profile from "@/views/Profile.vue";

const routes = [
    {path: '/', name: 'menu', component: Menu},
    {path: '/keranjang', name:'keranjang', component: Keranjang},
    {path: '/pesanan', name:'pesanan', component: Pesanan},
    {path: '/profiile', name:'profiile', component: Profile}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;