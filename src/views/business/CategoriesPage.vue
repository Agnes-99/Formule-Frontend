<!-- <template>
  <div class="category-page">
    <h1 class="title">Categories</h1>

    <ul class="category-list">
      <li
        v-for="cat in categories"
        :key="cat.id"
        class="category-item"
      >
        {{ cat.name }}
      </li>
    </ul>
  </div>
  
</template>

<script>
import CategoryService from "@/api/business/CategoryService.js";

export default {
  name: "CategoryList",
  data() {
    return {
      categories: [],
    };
  },
  created() {
    CategoryService.getAllCategories().then((res) => {
      this.categories = res.data;
    });
  },
};
</script>

<style scoped>
:root {
  --cream: #F0EAD2;
  --mint: #DDE5B6;
  --olive: #ADC178;
  --taupe: #A98467;
  --espresso: #6C584C;
}

.category-page {
  background-color: var(--cream);
  min-height: 100vh;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  color: var(--espresso);
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.category-item {
  background-color: var(--mint);
  border: 2px solid var(--olive);
  border-radius: 12px;
  padding: 1rem 2rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--espresso);
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-item:hover {
  background-color: var(--olive);
  color: white;
  transform: scale(1.05);
}
</style> -->
<template>
  <div class="category-page">
    <h1 class="title">Categories</h1>

    <ul class="category-list">
      <li v-for="cat in categories" :key="cat.name" class="category-item">
        <font-awesome-icon :icon="cat.icon" class="icon" />
        <div class="text">
          <span class="name">{{ cat.name }}</span>
          <p class="description">{{ cat.description }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import CategoryService from "@/api/business/CategoryService.js";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSoap,
  faTint,
  faPumpSoap,
  faSun,
  faSpa,
  faFlask,
  faDotCircle,
  faMask,
  faEye,
  faWind,
  faTools,
  faHands,
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "CategoriesPage",
  components: { FontAwesomeIcon },
  setup() {
    const categories = ref([]);

    const hardcodedCategories = [
      { name: "Cleansers", icon: faSoap, description: "Products that remove dirt, oil, makeup, and impurities from the skin." },
      { name: "Toners/Essences", icon: faTint, description: "Lightweight liquids that balance skin pH, hydrate, and prep the skin for serums and moisturizers." },
      { name: "Moisturizers", icon: faPumpSoap, description: "Creams, gels, and lotions that lock in hydration and strengthen the skin barrier." },
      { name: "Sunscreen (SPF)", icon: faSun, description: "Daily sun protection to shield skin from UVA and UVB damage." },
      { name: "Exfoliants", icon: faSpa, description: "Chemical or physical scrubs that remove dead skin cells and improve texture." },
      { name: "Serums & Ampoules", icon: faFlask, description: "Concentrated treatments targeting specific concerns." },
      { name: "Spot Treatments", icon: faDotCircle, description: "Targeted formulas for pimples, blemishes, and dark spots." },
      { name: "Masks", icon: faMask, description: "Sheet masks, clay masks, and overnight masks for deep treatment." },
      { name: "Eye Care", icon: faEye, description: "Creams, gels, or patches to reduce puffiness and fine lines." },
      { name: "Mists", icon: faWind, description: "Hydrating sprays that refresh and calm the skin." },
      { name: "Tools & Devices", icon: faTools, description: "Skincare tools such as rollers, brushes, and LED devices." },
      { name: "Body Care", icon: faHands, description: "Lotions, scrubs, oils, and SPF for the body's skin." },
    ];

    onMounted(() => {
      // Try fetching from API, fallback to hardcoded if fails
      CategoryService.getAllCategories()
        .then((res) => {
          // Adjust depending on your API structure
          categories.value = res.data?.data || res.data || hardcodedCategories;
        })
        .catch((err) => {
          console.error("API failed, using hardcoded categories:", err);
          categories.value = hardcodedCategories;
        });
    });

    return { categories };
  },
};
</script>

<style scoped>
:root {
  --cream: #f0ead2;
  --mint: #dde5b6;
  --olive: #adc178;
  --taupe: #a98467;
  --espresso: #6c584c;
}

.category-page {
  background-color: var(--cream);
  min-height: 100vh;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  color: var(--espresso);
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  list-style: none;
  padding: 0;
}

.category-item {
  display: flex;
  align-items: center;
  background-color: var(--mint);
  border: 2px solid var(--olive);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: var(--espresso);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 250px;
}

.category-item:hover {
  background-color: var(--olive);
  color: white;
  transform: scale(1.05);
}

.icon {
  font-size: 2rem;
  margin-right: 1rem;
}

.description {
  font-size: 0.85rem;
  color: #4a4a4a;
  margin-top: 0.2rem;
}

.name {
  font-weight: bold;
}
</style>

