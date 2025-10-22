<template>
  <section id="menu" class="pt-12 md:pt-20 pb-0 md:pb-8 px-4 sm:px-6 lg:px-8 scroll-mt-16 bg-white">
    <div class="app-container mx-auto max-w-7xl">
      <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6">Unsere Speisekarte</h2>

      <!-- Category strip -->
      <div class="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 px-1 sm:px-2 py-2 -mx-1 sm:-mx-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="categoryBtnClass(cat)"
          class="px-4 py-2 rounded-full border transition-all duration-150 snap-start whitespace-nowrap cursor-pointer"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Grid -->
      <div class="relative">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-1 sm:px-2 py-6">
          <template v-for="item in filteredMenu" :key="item.id">
            <div
              class="bg-white rounded-lg p-3 shadow-sm border border-gray-200 flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <h3 class="text-sm font-semibold text-primary mb-1">{{ item.name }}</h3>
                <p class="text-xs text-gray-600 line-clamp-2" v-if="item.description">{{ item.description }}</p>
              </div>

              <div class="mt-3 flex justify-between items-center">
                <span class="text-sm font-medium text-primary">{{ item.price }}</span>
                <button
                  class="bg-oil text-black px-3 py-1 rounded-full text-sm font-bold shadow hover:scale-105 bg-yellow-300 active:scale-95 active:bg-yellow-400 transition-all duration-150 ease-in-out"
                  title="In den Warenkorb"
                >
                  +
                </button>
              </div>
            </div>
          </template>

          <div v-if="filteredMenu.length === 0" class="col-span-full text-center text-gray-500 py-8">
            Keine Einträge in dieser Kategorie.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const categories = [
  'Alle',
  'Pizza',
  'Pizza 40cm',
  'Pide',
  'Warme Snacks',
  'Salate',
  'Dessert',
  'Getränke',
  'Biere & Weine'
]

// ALL pizzas from your original template converted into an array.
// category set to 'Pizza' for each. Images are placeholders (null).
const menu = ref([
  { id: 1, name: 'Pizza Margherita', description: 'Tomatensauce, Mozzarella, Oregano', price: '15.50 CHF', category: 'Pizza', image: null },
  { id: 2, name: 'Pizza Cipolla', description: 'Tomatensauce, Mozzarella, Zwiebeln, Oregano', price: '16.50 CHF', category: 'Pizza', image: null },
  { id: 3, name: 'Pizza Feta', description: 'Tomatensauce, Mozzarella, Feta, Oregano', price: '17.50 CHF', category: 'Pizza', image: null },
  { id: 4, name: 'Pizza Gorgonzola', description: 'Tomatensauce, Mozzarella, Gorgonzola, Oregano', price: '17.50 CHF', category: 'Pizza', image: null },
  { id: 5, name: 'Pizza Prosciutto Funghi', description: 'Tomatensauce, Mozzarella, Schinken, Champignons, Oregano', price: '19.50 CHF', category: 'Pizza', image: null },
  { id: 6, name: 'Pizza Prosciutto', description: 'Tomatensauce, Mozzarella, Schinken, Oregano', price: '18.50 CHF', category: 'Pizza', image: null },
  { id: 7, name: 'Pizza Pommes', description: 'Tomatensauce, Mozzarella, Pommes Frites, Oregano', price: '18.50 CHF', category: 'Pizza', image: null },
  { id: 8, name: 'Pizza Napoli', description: 'Tomatensauce, Mozzarella, Sardellen, Kapern, Oregano', price: '19.50 CHF', category: 'Pizza', image: null },
  { id: 9, name: 'Pizza Frutti di Mare', description: 'Tomatensauce, Mozzarella, Meeresfrüchte, Oregano', price: '21.50 CHF', category: 'Pizza', image: null },
  { id: 10, name: 'Pizza Hewina', description: 'Tomatensauce, Mozzarella, frische Tomaten, Oliven, Basilikum, Oregano', price: '18.50 CHF', category: 'Pizza', image: null },
  { id: 11, name: 'Pizza Lardée', description: 'Tomatensauce, Mozzarella, Speck, Ei, Oregano', price: '19.50 CHF', category: 'Pizza', image: null },
  { id: 12, name: 'Pizza Crottine', description: 'Tomatensauce, Mozzarella, Speck, Feta, Oregano', price: '19.50 CHF', category: 'Pizza', image: null },
  { id: 13, name: 'Pizza Kebab', description: 'Tomatensauce, Mozzarella, Kebabfleisch, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },
  { id: 14, name: 'Pizza al Tonno', description: 'Tomatensauce, Mozzarella, Thunfisch, Zwiebeln, Oregano', price: '19.50 CHF', category: 'Pizza', image: null },
  { id: 15, name: 'Pizza Siciliana', description: 'Tomatensauce, Mozzarella, Schinken, Oliven, Ei, Peperoni, Oregano', price: '21.50 CHF', category: 'Pizza', image: null },
  { id: 16, name: 'Pizza Salami', description: 'Tomatensauce, Mozzarella, Salami, Oregano', price: '18.50 CHF', category: 'Pizza', image: null },
  { id: 17, name: 'Pizza Capricciosa', description: 'Tomatensauce, Mozzarella, Schinken, Champignons, Artischocken, Ei, Oregano', price: '21.50 CHF', category: 'Pizza', image: null },
  { id: 18, name: 'Pizza Crevette', description: 'Tomatensauce, Mozzarella, Crevetten, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },
  { id: 19, name: 'Pizza Fulmine', description: 'Tomatensauce, Mozzarella, Spinat, Speck, Ei, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },
  { id: 20, name: 'Pizza Prosciutto Gorgonzola', description: 'Tomatensauce, Mozzarella, Schinken, Gorgonzola, Oregano', price: '19.50 CHF', category: 'Pizza', image: null },
  { id: 21, name: 'Calzone Kebab (zugedeckt)', description: 'Tomatensauce, Mozzarella, Kebabfleisch, Zwiebeln, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },
  { id: 22, name: "Pizza Hot'n Spicy (scharf)", description: 'Tomatensauce, Mozzarella, Zwiebeln, Peperoni, Rindfleisch, frische Tomaten, scharfe Gewürze, Oregano', price: '21.50 CHF', category: 'Pizza', image: null },
  { id: 23, name: 'Pizza Chicken Fajita', description: 'Tomatensauce, Mozzarella, Peperoni, Pouletgeschnetzeltes, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },
  { id: 24, name: 'Pizza Quattro Stagioni', description: 'Tomatensauce, Mozzarella, Schinken, Champignons, Peperoni, Artischocken, Oregano', price: '21.50 CHF', category: 'Pizza', image: null },
  { id: 25, name: 'Pizza Argovia', description: 'Tomatensauce, Mozzarella, Kalbfleisch, Knoblauch, Kräuterbutter, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },
  { id: 26, name: 'Pizza Rohrbach', description: 'Tomatensauce, Mozzarella, Kräuterbutter, Kalbfleisch, Peperoni, Knoblauch, Champignons, Oregano', price: '22.50 CHF', category: 'Pizza', image: null },
  { id: 27, name: 'Pizza Suhrental', description: 'Tomatensauce, Mozzarella, Salami, Zwiebeln, Champignons, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },
  { id: 28, name: 'Pizza Stromboli (scharf)', description: 'Tomatensauce, Mozzarella, scharfe Salami, Zwiebeln, Sardellen, Artischocken, Peperoni, Champignons, Oregano', price: '23.50 CHF', category: 'Pizza', image: null },
  { id: 29, name: 'Pizza Svizzera', description: 'Tomatensauce, Mozzarella, Schinken, Salami, Speck, Oregano', price: '21.50 CHF', category: 'Pizza', image: null },
  { id: 30, name: 'Pizza Prosciutto Salami', description: 'Tomatensauce, Mozzarella, Schinken, Salami, Oregano', price: '19.50 CHF', category: 'Pizza', image: null },
  { id: 31, name: 'Pizza Cino (scharf)', description: 'Tomatensauce, Mozzarella, frische Tomaten, Peperoni, Champignons, Knoblauch, Kalbfleisch, scharfe Gewürze, Oregano', price: '22.50 CHF', category: 'Pizza', image: null },
  { id: 32, name: 'Pizza Hawaii', description: 'Tomatensauce, Mozzarella, Schinken, Ananas, Oregano', price: '19.50 CHF', category: 'Pizza', image: null },
  { id: 33, name: 'Pizza Taj Mahal', description: 'Tomatensauce, Mozzarella, Curry, Pouletgeschnetzeltes, Ananas, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },
  { id: 34, name: 'Pizza Quattro Formaggi', description: 'Tomatensauce, Mozzarella, 4 Käsesorten, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },
  { id: 35, name: 'Pizza Vegetaria', description: 'Tomatensauce, Mozzarella, Oregano und drei Zutaten nach Wahl', price: '18.50 CHF', category: 'Pizza', image: null },
  { id: 36, name: 'Wunschpizza', description: 'Tomatensauce, Mozzarella, Oregano und vier Zutaten nach Wahl', price: '23.50 CHF', category: 'Pizza', image: null },
  { id: 37, name: 'Pizza Funghi', description: 'Tomatensauce, Mozzarella, Champignons, Oregano', price: '16.50 CHF', category: 'Pizza', image: null },
  { id: 38, name: 'Pizza Diavola (scharf)', description: 'Tomatensauce, Mozzarella, scharfe Salami, Oregano', price: '18.50 CHF', category: 'Pizza', image: null },
  { id: 39, name: 'Calzone (zugedeckt)', description: 'Tomatensauce, Mozzarella, Schinken, Ei, Champignons, Oregano', price: '20.50 CHF', category: 'Pizza', image: null },

 // --- Pizza (already complete) ---
  { id: 1, name: 'Pizza Margherita', description: 'Tomatensauce, Mozzarella, Oregano', price: '15.50 CHF', category: 'Pizza' },
  { id: 2, name: 'Pizza Salami', description: 'Tomatensauce, Mozzarella, Salami, Oregano', price: '18.50 CHF', category: 'Pizza' },
  { id: 3, name: 'Pizza Hawaii', description: 'Tomatensauce, Mozzarella, Schinken, Ananas, Oregano', price: '19.50 CHF', category: 'Pizza' },
  { id: 4, name: 'Pizza Quattro Formaggi', description: 'Vier Käsesorten mit Tomatensauce, Mozzarella und Oregano', price: '20.50 CHF', category: 'Pizza' },
  { id: 5, name: 'Pizza Vegetaria', description: 'Frisches Gemüse, Mozzarella, Tomatensauce, Oregano', price: '18.50 CHF', category: 'Pizza' },

  // --- Pizza 40cm ---
  { id: 50, name: 'Pizza 40cm Margherita', description: 'Riesenpizza für 2–3 Personen', price: '27.50 CHF', category: 'Pizza 40cm' },
  { id: 51, name: 'Pizza 40cm Salami', description: 'Mit extra Mozzarella und Salami', price: '29.50 CHF', category: 'Pizza 40cm' },
  { id: 52, name: 'Pizza 40cm Prosciutto', description: 'Mit Schinken und Oregano', price: '29.00 CHF', category: 'Pizza 40cm' },
  { id: 53, name: 'Pizza 40cm Quattro Stagioni', description: 'Mit vier Sorten Belag, perfekt zum Teilen', price: '31.50 CHF', category: 'Pizza 40cm' },

  // --- Pide ---
  { id: 60, name: 'Pide Sucuk', description: 'Türkische Pide mit Sucuk und Käse', price: '17.50 CHF', category: 'Pide' },
  { id: 61, name: 'Pide Kebab', description: 'Mit zartem Kebabfleisch und Zwiebeln', price: '18.50 CHF', category: 'Pide' },
  { id: 62, name: 'Pide Käse', description: 'Klassisch mit geschmolzenem Käse', price: '16.50 CHF', category: 'Pide' },
  { id: 63, name: 'Pide Spinat & Feta', description: 'Mit Spinat, Feta und Kräutern', price: '17.00 CHF', category: 'Pide' },

  // --- Warme Snacks ---
  { id: 70, name: 'Pommes Frites', description: 'Knusprige goldene Pommes', price: '6.50 CHF', category: 'Warme Snacks' },
  { id: 71, name: 'Chicken Nuggets (6 Stk)', description: 'Mit hausgemachter Sauce', price: '8.50 CHF', category: 'Warme Snacks' },
  { id: 72, name: 'Mozzarella Sticks (6 Stk)', description: 'Mit würziger Tomatensauce', price: '9.00 CHF', category: 'Warme Snacks' },
  { id: 73, name: 'Onion Rings (10 Stk)', description: 'Knusprige Zwiebelringe', price: '7.50 CHF', category: 'Warme Snacks' },

  // --- Salate ---
  { id: 80, name: 'Grüner Salat', description: 'Frisch mit hausgemachtem Dressing', price: '7.50 CHF', category: 'Salate' },
  { id: 81, name: 'Gemischter Salat', description: 'Frisches Gemüse der Saison', price: '8.50 CHF', category: 'Salate' },
  { id: 82, name: 'Poulet Salat', description: 'Mit gebratenem Pouletstreifen', price: '12.50 CHF', category: 'Salate' },
  { id: 83, name: 'Thunfisch Salat', description: 'Mit Ei, Mais, Thunfisch und Zwiebeln', price: '11.50 CHF', category: 'Salate' },

  // --- Dessert ---
  { id: 90, name: 'Tiramisu', description: 'Hausgemacht mit Mascarpone', price: '6.50 CHF', category: 'Dessert' },
  { id: 91, name: 'Schokoladenmousse', description: 'Zart-cremig, leicht gekühlt serviert', price: '6.00 CHF', category: 'Dessert' },
  { id: 92, name: 'Baklava', description: 'Süßes türkisches Gebäck mit Pistazien', price: '5.50 CHF', category: 'Dessert' },
  { id: 93, name: 'Panna Cotta', description: 'Mit Erdbeersauce serviert', price: '6.50 CHF', category: 'Dessert' },

  // --- Getränke ---
  { id: 100, name: 'Coca-Cola 0.5L', description: '', price: '3.50 CHF', category: 'Getränke' },
  { id: 101, name: 'Fanta 0.5L', description: '', price: '3.50 CHF', category: 'Getränke' },
  { id: 102, name: 'Sprite 0.5L', description: '', price: '3.50 CHF', category: 'Getränke' },
  { id: 103, name: 'Mineralwasser 0.5L', description: '', price: '2.50 CHF', category: 'Getränke' },
  { id: 104, name: 'Ayran', description: 'Erfrischendes Joghurtgetränk', price: '2.50 CHF', category: 'Getränke' },

  // --- Biere & Weine ---
  { id: 110, name: 'Heineken 0.33L', description: '', price: '4.50 CHF', category: 'Biere & Weine' },
  { id: 111, name: 'Eichhof Lager 0.5L', description: '', price: '5.00 CHF', category: 'Biere & Weine' },
  { id: 112, name: 'Weisswein (Glas)', description: 'Kalt serviert, fruchtig', price: '6.50 CHF', category: 'Biere & Weine' },
  { id: 113, name: 'Rotwein (Glas)', description: 'Trocken, kräftig im Geschmack', price: '6.50 CHF', category: 'Biere & Weine' }

])

const selectedCategory = ref('Pizza') // default to Pizza as you asked

const filteredMenu = computed(() => {
  if (selectedCategory.value === 'Alle') return menu.value
  // For other categories we currently only have 'Pizza' items.
  return menu.value.filter(i => i.category === selectedCategory.value)
})

function categoryBtnClass(cat) {
  if (selectedCategory.value === cat) {
    return 'bg-primary text-white shadow-md scale-[1.03]'
  }
  return 'bg-white text-gray-700 border-gray-300 hover:border-primary/50'
}
</script>

 