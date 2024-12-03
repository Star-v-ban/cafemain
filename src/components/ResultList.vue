  <script setup>

  import { useProductStore } from '/src/stores/ProductStore';
  import { ref } from 'vue';
  
  const productStore = useProductStore();
  const arrDebtors = ref([]);

  
  function calculateDebts() {
  const spending = [];

  productStore.products.forEach(product => { 
    const costPerPerson = product.foodcost / product.eatBy.length;
    product.eatBy.forEach(person => {
      if (person.name !== product.payerPerson) {
        
        const debtorId = `${product.id}-${person.name}`;
        const creditorId = `${product.id}-${product.payerPerson}`;

        const index = spending.findIndex(spen => spen.id === debtorId && spen.debt.name === creditorId);
        


        if (index >= 0) {
          spending[index].debt.price += costPerPerson;
        } else {
          spending.push({
            id: debtorId,
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
      const minPrice = Math.min(spen.debt.price, opposite.debt.price); 
      spen.debt.price -= minPrice; 
      opposite.debt.price -= minPrice; 
    } 
  }); 
  console.log('Spending2 :', spending);

  const nonZeroDebtors = spending.filter(spen => {
  if (spen.debt?.price > 0 || !spen.debt) {
    return true;
  }
  return false;
});

const zeroDebtors = spending.filter(spen => {
  if (spen.debt && spen.debt.price === 0) {
    return true;
  }
  return false;
});

arrDebtors.value = [
  ...nonZeroDebtors.sort((a, b) => a.id - b.id),
  ...zeroDebtors
].reduce((acc, curr) => {
  const existing = acc.find(item => item.id === curr.id);
  if (!existing) {
    acc.push(curr);    
  }
  return acc;
}, []);



  console.log('Spending data:', spending);
  console.log('Non-zero debtors:', nonZeroDebtors);
  console.log('Zero debtors:', zeroDebtors);
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
      <v-list-item v-if="arrDebtors.length === 0">Все расплатились!</v-list-item>
      <v-list v-for="(debtor) in arrDebtors" :key="debtor.id">
        <v-list-item v-if="debtor.debt && debtor.debt.price > 0"><strong>{{ debtor.name }}</strong> должен(на) <strong>{{ debtor.debt.name }}</strong> : {{ debtor.debt.price }}</v-list-item>
        <v-list-item v-else-if="debtor.debt.price === 0"><strong>{{ debtor.name }}</strong> Никому не должен(на)</v-list-item>
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

  .div {
    
  }
  
  </style>
  