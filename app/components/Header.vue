<template>
  <header class="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
    <div class="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
      <!-- Logo -->
      <NuxtLink to="/" class="text-3xl font-extrabold text-primary">
        Pizza Oregano
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex space-x-6">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-lg font-medium text-gray-600 hover:text-white hover:bg-primary transition duration-300 px-3 py-2 rounded-lg"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Right Side Controls -->
      <div class="flex items-center space-x-4">
        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden text-2xl text-gray-600"
          @click="isMenuOpen = !isMenuOpen"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Language Dropdown -->
        <div class="relative" ref="dropdownRef">
          <button
            @click.stop="toggleLanguageDropdown"
            class="flex items-center space-x-1 text-lg text-gray-600 hover:text-primary transition-colors duration-300"
          >
            <span>{{ currentLanguage }}</span>
            <i class="fas fa-chevron-down text-sm"></i>
          </button>

          <div
            v-if="isLanguageOpen"
            class="absolute right-0 mt-2 w-20 bg-white rounded-lg shadow-lg py-2 z-50"
          >
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="selectLanguage(lang)"
              class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary flex items-center justify-between"
            >
              <Icon :name="lang.icon" class="w-5 h-5" />
              <span>{{ lang.name }}</span>
            </button>
          </div>
        </div>

        <!-- Login -->
        <button
          class="hidden sm:block text-lg text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          Login
        </button>

        <!-- Cart -->
        <button
          class="relative text-2xl text-primary hover:text-primary/80"
          aria-label="Open cart"
        >
          <i class="fas fa-shopping-cart"></i>
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >1</span
          >
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade">
      <nav
        v-if="isMenuOpen"
        class="md:hidden bg-white border-t border-gray-200 py-4 px-6 space-y-3"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="block text-lg font-medium text-gray-700 hover:bg-primary hover:text-white rounded-lg px-3 py-2 transition"
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </a>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMenuOpen = ref(false)
const isLanguageOpen = ref(false)
const currentLanguage = ref('DE')
const dropdownRef = ref(null)

const navLinks = [
  { href: '#home', label: 'Start' },
  { href: '#highlights', label: 'Highlights' },
  { href: '#menu', label: 'Speisekarte' },
  { href: '#about', label: 'Über uns' },
  { href: '#review', label: 'Bewertungen' }
]

const languages = [
  { code: 'de', name: 'DE', icon: 'flag:de-1x1' },
  { code: 'en', name: 'EN', icon: 'flag:gb-1x1' },
  { code: 'fr', name: 'FR', icon: 'flag:fr-1x1' }
]

const selectLanguage = (lang) => {
  currentLanguage.value = lang.name
  isLanguageOpen.value = false
}

const toggleLanguageDropdown = () => {
  isLanguageOpen.value = !isLanguageOpen.value
}

const closeLanguageDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isLanguageOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeLanguageDropdown)
})
onUnmounted(() => {
  document.removeEventListener('click', closeLanguageDropdown)
})
</script>
 