<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "BorrowForm",
  setup() {
    const borrowData = ref({ itemId: "", userId: "" });
    const borrowItem = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/borrow`,
          borrowData.value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Item successfully borrowed!");
      } catch (error) {
        console.error("Error borrowing item:", error);
        alert("Failed to borrow item. Please try again.");
      }
    };
    return {
      borrowData,
      borrowItem,
    };
  },
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="mb-4">
      <button
        @click="goHome"
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Home
      </button>
    </div>

    <form
      @submit.prevent="submitForm"
      class="bg-white shadow-md rounded-lg p-8"
    >
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Borrow Equipment</h2>

      <!-- Error Message -->
      <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 rounded">
        {{ error }}
      </div>

      <!-- Success Message -->
      <div v-if="success" class="mb-4 p-3 bg-green-100 text-green-700 rounded">
        {{ success }}
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="item">
          Equipment
        </label>
        <select
          id="item"
          @change="handleItemSelect($event.target.value)"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          :value="selectedItem?._id"
        >
          <option value="">Select an item</option>
          <option
            v-for="item in availableItemsFiltered"
            :key="item._id"
            :value="item._id"
          >
            {{ item.name }} (Available: {{ item.amount }})
          </option>
          <option
            v-for="item in availableItems.filter(
              (i) => parseInt(i.amount) === 0
            )"
            :key="item._id"
            :value="item._id"
            disabled
            class="text-gray-400"
          >
            {{ item.name }} (Out of Stock)
          </option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          v-model="formData.amount"
          :max="selectedItem?.amount"
          min="1"
          step="1"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          :class="{ 'border-red-500': !validateAmount && formData.amount }"
          required
          @input="formData.amount = formData.amount.replace(/[^0-9]/g, '')"
        />
        <p v-if="amountError" class="text-red-500 text-xs italic mt-1">
          {{ amountError }}
        </p>
        <p v-if="selectedItem" class="text-gray-600 text-xs mt-1">
          Valid range: 1 - {{ selectedItem.amount }}
        </p>
      </div>

      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="borrower_name"
        >
          Borrower Name
        </label>
        <input
          type="text"
          id="borrower_name"
          v-model="formData.borrower_name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <!-- Update the officer select element to use correct data structure -->
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="officer_name"
        >
          Officer Name
        </label>
        <select
          id="officer_name"
          v-model="formData.officer_name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="">Select an officer</option>
          <option
            v-for="officer in availableOfficers"
            :key="officer._id"
            :value="officer.name"
          >
            {{ officer.name }}
          </option>
        </select>
      </div>

      <!-- Add return date field before the submit button -->
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="return_date"
        >
          Return Date
        </label>
        <input
          type="datetime-local"
          id="return_date"
          v-model="formData.return_date"
          :min="minDate"
          @change="formData.return_date = formatTo1PM($event.target.value)"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div class="flex items-center justify-end">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :disabled="!validateAmount"
        >
          Borrow
        </button>
      </div>
    </form>
  </div>
</template>
