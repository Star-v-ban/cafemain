  <script setup>

  import { useProductStore } from '/src/stores/ProductStore';
  import { ref } from 'vue';
  
  const productStore = useProductStore();
  const arrDebtors = ref([]);

  
  function calculateDebts() {
  const spending = [];
  console.log('Prod :', productStore.products);
  

  productStore.products.forEach(product => { 
    const costPerPerson = product.foodcost / product.eatBy.length;
    product.eatBy.forEach(person => {
      if (person.name !== product.payerPerson) {
        
        const debtorId = `${product.id}-${person.name}`;
        const creditorId = `${product.id}-${product.payerPerson}`;
        console.log('deb cre :', debtorId, creditorId);

        const index = spending.findIndex(spen => spen.id === debtorId && spen.debt.name === creditorId);
        

        if (index >= 0) {
          spending[index].debt.price += costPerPerson;
        } else if(index === undefined) {
          spending.push({
            id: debtorId,
            name: person.name,
            debt: {
              name: product.payerPerson,
              price: 0
            }})
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

  const nonZeroDebtors = spending.filter(spen => spen.debt?.price > 0); 
  const zeroDebtors = spending.filter(spen => !spen.debt || spen.debt.price === 0);

  const allParticipants = Array.from(new Set([...productStore.products.flatMap(product => product.eatBy.map(person => person.name))]));
  const owesNoOne = Array.from(new Set(zeroDebtors.map(debtor => debtor.name)));
  const actualDebtors = spending.filter(spen => spen.debt?.price > 0).map(spen => spen.name);
  const missingParticipants = allParticipants.filter(participant => !actualDebtors.includes(participant));

  arrDebtors.value = [
    ...nonZeroDebtors.sort((a, b) => a.id.localeCompare(b.id)),
    ...zeroDebtors.filter(debtor => !owesNoOne.includes(debtor.name)),
    ...missingParticipants.map(name => ({ name, debt: null }))
  ];

  console.log('arrDebtors:', arrDebtors.value);

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
  min-height="20vh" v-if="arrDebtors.length >= 0">
  <v-card-title><h2>Результаты деления счёта</h2>
  </v-card-title>
  <v-divider></v-divider>
    <v-container>
      <v-list-item v-if="arrDebtors.length === 0">Все расплатились!</v-list-item>
      <v-list-item v-for="debtor in arrDebtors" :key="debtor.id">
        <template v-if="debtor.debt && debtor.debt.price > 0">
          <strong>{{ debtor.name }}</strong> должен(на) <strong>{{ debtor.debt.name }}</strong> : {{ debtor.debt.price }}
        </template>
        
        <template v-else-if="debtor.debt?.price === 0 || debtor.debt === null">
          <strong>{{ debtor.name }}</strong> Никому не должен(на)
        </template>
      </v-list-item>

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
  &--non-zero {
    background-color: #f5f5f5;
    border-left: 2px solid #007bff;
  }
  
  &--zero {
    color: #6c757d;
  }
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
  