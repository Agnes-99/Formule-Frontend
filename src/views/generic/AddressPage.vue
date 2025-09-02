<template>
  <div class="address-page">
    <div class="container">
      <div class="page-header">
        <h1>Shipping Address</h1>
        <p>Add and manage your delivery addresses</p>
      </div>

      <AddressForm
        ref="addressForm"
        :address="currentAddress"
        :customerId="currentId"
        @saved="handleAddressSaved"
        @error="showError"
        @cancel="cancelEdit"
      />

      <div class="address-list-section">
        <div class="section-header">
          <h2>Your Addresses</h2>
          <button 
            class="btn btn-primary"
            @click="showAddForm"
            v-if="!showForm"
          >
            <i class="fas fa-plus"></i> Add New Address
          </button>
        </div>

        <div v-if="loading" class="loading-state">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Loading addresses...</p>
        </div>

        <div v-else-if="addresses.length === 0" class="empty-state">
          <i class="fas fa-map-marker-alt"></i>
          <h3>No addresses yet</h3>
          <p>Add your first address to get started</p>
          <button class="btn btn-primary" @click="showAddForm">
            Add Your First Address
          </button>
        </div>

        <div v-else class="address-grid">
          <div 
            v-for="address in addresses" 
            :key="address.id" 
            class="address-card"
            :class="{ 'editing': currentAddress && currentAddress.id === address.id }"
          >
            <div class="address-content">
              <h4>Address #{{ address.id }}</h4>
              <p>{{ address.street }}</p>
              <p>{{ address.city }}, {{ address.province }} {{ address.postalCode }}</p>
              <p>{{ address.country }}</p>
              <p class="customer-id">Customer ID: {{ address.customerId }}</p>
            </div>

            <div class="address-actions">
              <button 
                class="btn btn-secondary"
                @click="editAddress(address)"
                :disabled="currentAddress !== null"
              >
                <i class="fas fa-edit"></i> Edit
              </button>

              <button 
                class="btn btn-danger"
                @click="deleteAddress(address.id)"
                :disabled="currentAddress !== null"
              >
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="toast.show" class="toast" :class="toast.type">
      {{ toast.message }}
      <button @click="toast.show = false" class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>

import AddressForm from '../../components/generic/AddressForm.vue'
import AddressService from '../../api/generic/AddressService.js'

export default {
  name: 'AddressPage',
  components: { AddressForm },
  data() {
    return {
      addresses: [],
      currentAddress: null,
      customerId: 1, 
      loading: false,
      showForm: false,
      toast: {
        show: false,
        message: '',
        type: 'success'
      }
    };
  },
  computed: {
    isEditing() {
      return this.currentAddress !== null;
    }
  },
  mounted() {
    this.loadAddresses();
  },
  methods: {
    async loadAddresses() {
      this.loading = true;
      try {
        this.addresses = await AddressService.getAll();
      } catch (error) {
        console.error('Failed to load addresses:', error);
        this.showError('Failed to load addresses');
      } finally {
        this.loading = false;
      }
    },
    showAddForm() {
      this.currentAddress = null;
      this.showForm = true;
    },
    editAddress(address) {
      this.currentAddress = { ...address };
      this.showForm = true;
    },
    cancelEdit() {
      this.currentAddress = null;
      this.showForm = false;
    },
    async handleAddressSaved(savedAddress) {
      if (this.currentAddress && this.currentAddress.id) {
        
        const index = this.addresses.findIndex(a => a.id === savedAddress.id);
        if (index !== -1) {
          this.addresses.splice(index, 1, savedAddress);
        }
        this.showSuccess('Address updated successfully');
      } else {
        
        this.addresses.push(savedAddress);
        this.showSuccess('Address saved successfully');
      }
      
      this.showForm = false;
      this.currentAddress = null;
    },
    async deleteAddress(addressId) {
      if (confirm('Are you sure you want to delete this address?')) {
        try {
          await AddressService.delete(addressId);
          this.addresses = this.addresses.filter(a => a.id !== addressId);
          this.showSuccess('Address deleted successfully');
        } catch (error) {
          console.error('Failed to delete address:', error);
          this.showError('Failed to delete address');
        }
      }
    },
    showSuccess(message) {
      this.toast = { show: true, message, type: 'success' };
      this.hideToastAfterDelay();
    },
    showError(message) {
      this.toast = { show: true, message, type: 'error' };
      this.hideToastAfterDelay();
    },
    hideToastAfterDelay() {
      setTimeout(() => { this.toast.show = false }, 3000);
    }
  }
}
</script>

<style scoped>
.address-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
  text-align: center;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.page-header p {
  font-size: 16px;
  color: #718096;
  margin: 0;
}

.address-list-section {
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  gap: 6px;
}

.btn-primary {
  background-color: #4a90e2;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #3a7bc8;
}

.btn-secondary {
  background-color: #f8f9fa;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #edf2f7;
}

.btn-danger {
  background-color: #e53e3e;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c53030;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-state {
  text-align: center;
  padding: 40px 20px;
  color: #718096;
}

.loading-state i {
  font-size: 24px;
  margin-bottom: 12px;
  color: #a0aec0;
}

.loading-state p {
  font-size: 14px;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 48px 20px;
  background-color: #c8cfae;
  border-radius: 8px;
  border: 1px dashed #e7ebc7;
}

.empty-state i {
  font-size: 36px;
  color: #2c3845;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 18px;
  color: #4a5568;
  margin-bottom: 8px;
}

.empty-state p {
  color: #718096;
  margin-bottom: 20px;
  font-size: 14px;
}

.address-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.address-card {
  background: rgb(255, 255, 255);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.address-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.address-card.editing {
  border-color: #4a90e2;
  background-color: rgba(74, 144, 226, 0.03);
}

.address-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
}

.address-content p {
  color: #4a5568;
  margin-bottom: 6px;
  font-size: 14px;
}

.customer-id {
  font-size: 12px;
  color: #a0aec0;
  margin-top: 8px;
  font-style: italic;
}

.address-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}

.address-actions .btn {
  flex: 1;
  padding: 8px 12px;
  font-size: 13px;
}

.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 12px 20px;
  border-radius: 6px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease;
  max-width: 320px;
}

.toast.success {
  background-color: #38a169;
}

.toast.error {
  background-color: #e53e3e;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  margin-left: 8px;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .address-page {
    padding: 16px;
  }
  
  .container {
    max-width: 100%;
  }
  
  .page-header h1 {
    font-size: 24px;
  }
  
  .address-list-section {
    padding: 20px;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .address-actions {
    flex-direction: column;
  }
  
  .toast {
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
  }
}
</style>

