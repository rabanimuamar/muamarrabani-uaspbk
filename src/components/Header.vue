<template>
  <header class="relative w-full h-64 md:h-80 lg:h-[28rem] overflow-hidden">
    <!-- Gambar Background -->
    <img
      src="https://th.bing.com/th/id/OIP.flQoJsatqy6hgnNKmBfyBgHaEL?w=320&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3g"
      alt="Banner Kedai"
      class="absolute inset-0 w-full h-full object-cover brightness-50"
    />

    <!-- Overlay Blur -->
    <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

    <!-- Konten Teks -->
    <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <h1 class="text-white text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-xl">
        Selamat Datang di Kedai Harian
      </h1>
      <p class="mt-4 text-slate-100 text-base md:text-lg font-light max-w-xl drop-shadow-sm leading-relaxed">
        Temukan berbagai <span class="text-yellow-300 font-semibold">makanan lezat</span> & 
        <span class="text-cyan-300 font-semibold">minuman segar</span> favorit Anda. 
        Cepat, praktis, dan pas di kantong!
      </p>
    </div>
  </header>
</template>
