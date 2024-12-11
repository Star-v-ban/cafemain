<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { usePeopleStore } from "/src/stores/PeopleStore";
import { v4 as uuidv4 } from 'uuid';

const router = useRouter();
const peopleStore = usePeopleStore();
const firstname = ref("");
const valid = ref(true);
const userId = uuidv4();

const addUser = () => {
  if (valid.value) {
    if (firstname.value.length > 0) {
      const newPerson = { 
        id: userId, 
        name: firstname.value, 
        selected: false 
      };
      peopleStore.addPerson(newPerson);
      firstname.value = "";
    }
  }
};

const removeUser = (index) => {
  peopleStore.removePerson(index);
};

const checkAndNavigate = () => {
  if (peopleStore.people.length > 1) {
    router.push({ name: "addchecks" });
  } else {
    alert("Минимум два человека!");
  }
};
</script>

<template>
  <v-card class="d-flex flex-column align-center justify-start pt-1" width="62.5em">
    <v-card-title>
      <h2>
        Добавление людей
      </h2>
    </v-card-title>

    <v-form v-model="valid" @submit.prevent="">
      <v-container>
        <v-text-field
          v-model="firstname"
          label="Введите имя"
        ></v-text-field>
        <v-btn
          text="Добавить"
          @click="addUser"
          ></v-btn>
      </v-container>
    </v-form>
    
    <v-container>
      <v-list class="d-flex flex-column align-center">
        <v-list-item v-for="(person, index) in peopleStore.people" :key="person.id">
          <v-card>
          <v-list-item class="d-flex flex-row justify-start ">
            <v-container class="d-flex ">
              <v-text-field
                readonly
                variant="solo"
                >{{ person.name }}
              </v-text-field>
              <v-list-item-action class="mr-5 pb-5 pl-5">
                <v-btn
                  icon="mdi-close"
                  @click="removeUser(index)"
                ></v-btn>
              </v-list-item-action>
            </v-container>
          </v-list-item>
          </v-card>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
  <v-card class="d-flex justify-center align-center mt-2" height="6em">
    <v-btn
      width="30em"
      @click="checkAndNavigate"
    >Добавить продукты
    </v-btn>
  </v-card>
</template>
