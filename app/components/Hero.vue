<template>
<section id="home" class="pt-20 md:pt-20 pb-0 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20">
  <div class="app-container">
    <div class="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
      <div class="flex flex-col">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-primary mb-3">Feiner, Gesünder, Günstiger <br class="hidden sm:block">
          <span class="block">Pizza, Döner &amp; mehr.</span>
        </h2>
        <p class="text-base md:text-lg text-primary/90 max-w-prose">Wo italienische Klassiker und orientalische Spezialitäten zuhause sind.</p>
       <div
          class="relative rounded-2xl overflow-hidden shadow-lg mt-6 sm:mt-8 w-full max-w-xl text-white transition-all duration-700 ease-in-out"
          :class="slides[currentSlide].bg"
        >
          <div class="p-4 sm:p-5 text-center transition-opacity duration-700 ease-in-out">
            <h3 class="text-base sm:text-lg md:text-xl font-semibold mb-1">
              {{ slides[currentSlide].title }}
            </h3>
            <p class="text-xs sm:text-sm mb-2">
              {{ slides[currentSlide].desc }}
            </p>
            <a
              :href="slides[currentSlide].link"
              class="inline-block bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold shadow hover:bg-gray-100 transition"
            >
              {{ slides[currentSlide].button }}
            </a>
          </div>
        </div>
      </div>
      <div class="hidden md:block relative w-full h-[360px] lg:h-[420px]">
          <NuxtImg
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          alt="Food slideshow"
          loading="lazy"
          class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[70%] max-w-[420px] h-auto rounded-2xl object-cover shadow-xl transition-opacity duration-1000"
          :class="currentImage === index ? 'opacity-100' : 'opacity-0'"
        /> 
  </div>
    </div>
  </div>
</section>

</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const images = [
  '/images/hero/image-1.png',
  '/images/hero/image-2.png',
  '/images/hero/image-3.png', 
]
const slides = [
  {
    title: '🚚 −10% auf Lieferung',
    desc: 'Dauerhaft gültig – automatisch im Checkout.',
    link: '#menu',
    button: 'Jetzt bestellen',
    bg: 'bg-gradient-to-r from-orange-500 to-yellow-400',
  },
  {
    title: '🍕 2 für 1 Pizza Dienstag',
    desc: 'Nur am Dienstag – zweite Pizza gratis!',
    link: '#offers',
    button: 'Angebote ansehen',
    bg: 'bg-gradient-to-r from-red-500 to-pink-500',
  },
  {
    title: '🥙 Gratis Getränk ab 20€',
    desc: 'Wähle dein Lieblingsgetränk kostenlos!',
    link: '#drinks',
    button: 'Jetzt auswählen',
    bg: 'bg-gradient-to-r from-green-500 to-lime-400',
  },
]

const currentImage = ref(0)
const currentSlide = ref(0)


let interval = null

onMounted(() => {
  interval = setInterval(() => {
    currentImage.value = (currentImage.value + 1) % images.length;
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 3000) // change every 3s

  
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>