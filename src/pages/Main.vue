<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
function clearLocalStorage() {
  localStorage.clear();
}

window.addEventListener('popstate', function(event) {
  if (window.location.pathname === '/') {
    clearLocalStorage();
  }
});
window.addEventListener('load', function() {
  if (window.location.pathname === '/' && localStorage.length > 0) {
    clearLocalStorage();
  }
});

  const addedPeople = () => {
    router.push('addpeople');
  };
</script>

<template>
    <div class = "d-flex justify-center flex-column" >
      <h1 class = "mb-10">Разделите свои счета</h1>
      <h2>Это простой сайт для того, чтобы разделить общий счёт в заведениях.
      <div>
        <v-btn @click="addedPeople" class = "mt-10">Начать</v-btn>
      </div>
    </h2>
    </div>
</template>

<style scoped>
.v-btn {
    border-radius: 2em;
    width: 8em
  }
</style>
