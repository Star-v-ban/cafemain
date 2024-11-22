  <script setup>

  import { useProductStore } from '/src/stores/ProductStore';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const productStore = useProductStore();
  const arrDebtors = ref([]);
  const router = useRouter();

  
  function calculateDebts() {
  const spending = [];
  
  productStore.products.forEach(product => {
    product.eatBy.forEach(person => {
      if (person.name !== product.payerPerson) {
        const costPerPerson = product.foodcost / product.eatBy.length;
        const index = spending.findIndex(spen => spen.name === person.name && spen.debt.name === product.payerPerson);
  
        if (index >= 0) {
          spending[index].debt.price += costPerPerson;
          } else {
            spending.push({
            id: spending.length + 1,
            name: person.name,
            debt: {
              name: product.payerPerson,
              price: costPerPerson
            }
          });
          
        }
      }
    });
  });
  
  spending.forEach(spen => {
  const opposite = spending.find(s => s.name === spen.debt.name && s.debt.name === spen.name);
  if (opposite) {
      const minPrice = Math.min(spen.debt.price || 0, opposite.debt.price || 0);
      spen.debt.price -= minPrice;
      opposite.debt.price -= minPrice;
    }
  });
  
  arrDebtors.value = spending.filter(spen => spen.debt.price >= 0);
  console.log('Arr debtors:', arrDebtors.value);

  }
  
  calculateDebts();
  
  const comeBack = () => {
    window.location.href = '/';}
  </script>

<template>
  <v-card
  class="d-flex
  flex-column
  align-center
  justify-start pt-1"
  width="62.5em"
  min-height="20vh">
  <v-card-title><h2>Результаты деления счёта</h2>
  </v-card-title>
  <v-divider></v-divider>
    <v-container>
      <v-list v-for="(debtor) in arrDebtors" :key="debtor.id">
        <v-list-item v-if="debtor.debt.price>0"><strong>{{ debtor.name }}</strong> должен(на) <strong>{{ debtor.debt.name }}</strong> : {{ debtor.debt.price }}</v-list-item>
        <v-list-item v-else><strong>{{ debtor.name }}</strong> Никому не должен(на)</v-list-item>
      </v-list>
    </v-container>
  </v-card>
  <v-card class="d-flex justify-center align-center mt-2" height="4em">
    <v-btn @click="comeBack" width="50em">Домой</v-btn>
  </v-card>
</template>
  
  <style scoped lang="scss">
  .v-btn {
      border-radius: 2em
  }
  
  .v-card {
      border-radius: 2em
  }
  
  .v-list-item {
      .v-card {
          border-radius: 0em
      }
      .v-btn {
          border-radius: 10em
      }
      font-size:20px;
  }
  
  .v-checkbox {
      border: 0.0625em solid white;
      border-radius: 2em;
  }
  
  </style>
  