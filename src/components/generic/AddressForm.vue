<template>
  <form class="address-form" @submit.prevent="handleSubmit">
    <h2>{{ isEdit ? "Update Address" : "Add Address" }}</h2>

    <input v-model="form.street" type="text" placeholder="Street" required />
    <input v-model="form.city" type="text" placeholder="City" required />
    <input v-model="form.province" type="text" placeholder="Province" required />
    <input v-model="form.postalCode" type="text" placeholder="Postal Code" required />
    <input v-model="form.country" type="text" placeholder="Country" required />
    <input v-model="form.customerId" type="text" placeholder="Customer ID" required />

    <div class="buttons">
      <button type="submit">{{ isEdit ? "Update" : "Save" }}</button>
      <button type="button" @click="resetForm">Clear</button>
      <button type="button" @click="cancelEdit" v-if="isEdit">Cancel</button>
    </div>
    
    <p v-if="message" class="message">{{ message }}</p>
  </form>
</template>

<script>
import axios from "axios";
import AddressService from "../../api/generic/AddressService.js";

export default {
  name: "AddressForm",
  props: {
    address: {
      type: Object,
      default: null
    },
    customerId: {
      type: Number,
      default: null
    }
  },
  emits: ['saved', 'error', 'cancel'],
  data() {
    return {
      form: {
        id: null,
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
        customerId: "",
      },
      message: ""
    };
  },
  computed: {
    isEdit() {
      return this.form.id !== null;
    }
  },
  watch: {
    address: {
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal };
        } else {
          this.resetForm();
        }
      },
      immediate: true
    },
    customerId: {
      handler(newVal) {
        if (newVal && !this.form.customerId) {
          this.form.customerId = newVal;
        }
      },
      immediate: true
    }
  },
  methods: {
    async handleSubmit() {
      try {
        let savedAddress;
        
        if (this.isEdit) {
          savedAddress = await AddressService.update(this.form);
          this.message = "Address updated successfully!";
        } else {
          savedAddress = await AddressService.create(this.form);
          this.message = "Address saved successfully!";
        }
        
        this.$emit('saved', savedAddress);
        this.resetForm();
        
       
        setTimeout(() => {
          this.message = "";
        }, 3000);
      } catch (err) {
        console.error(err);
        this.message = "Error saving address";
        this.$emit('error', err);
      }
    },
    resetForm() {
      this.form = {
        id: null,
        street: "",
        city: "",
        province: "",
        postalCode: "",
        country: "",
        customerId: "",
      };
      this.message = "";
    },
    cancelEdit() {
      this.resetForm();
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.address-form {
  background: #F0EAD2;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.address-form h2 {
  color: #6C584C;
  margin-bottom: 1rem;
}

.address-form input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 0.8rem;
  border: 1px solid #A98467;
  border-radius: 8px;
  background: #fff;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

button {
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button[type="submit"] {
  background: #ADC178;
  color: white;
}

button[type="button"] {
  background: #A98467;
  color: white;
}

.message {
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  background: #DDE5B6;
  color: #6C584C;
  text-align: center;
}
</style>


