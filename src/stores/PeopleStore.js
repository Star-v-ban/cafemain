import { defineStore } from 'pinia';

export const usePeopleStore = defineStore('people', {
    state: () => ({
        people: []
        }
    ),
    actions: {
        addPerson(person) {
            this.people.push(person);
        },
        removePerson(index) {
            this.people.splice(index, 1);
        },
        getPerson(id) {
            return this.people.find(people => people.id === id);
        },
        PersonName (firstname) {
            return this.people.find(people => people.firstname === firstname)
        }
    }
});