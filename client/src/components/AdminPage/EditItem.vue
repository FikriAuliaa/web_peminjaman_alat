<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "EditItem",
  setup() {
    const itemData = ref({ name: "", amount: "", condition: "" });
    const editItem = async (id) => {
      try {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/admin/${id}`,
          itemData.value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Item successfully updated!");
      } catch (error) {
        console.error("Error updating item:", error);
        alert("Failed to update item. Please try again.");
      }
    };
    return {
      itemData,
      editItem,
    };
  },
};
</script>

<template>
  <div class="overlay">
    <div class="form md:w-2/4 w-5/6">
      <button @click="$router.push('/admin')" class="close-button">X</button>
      <h1 class="mb-3 text-white text-center md:text-2xl text-xl">Edit Item</h1>

      <form @submit.prevent="submitForm">
        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Item Name</label
          >
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Computer"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
        </div>

        <div class="mb-5">
          <label
            for="amount"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Amount</label
          >
          <input
            type="number"
            id="amount"
            v-model="form.amount"
            placeholder="15"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            min="0"
          />
        </div>

        <div class="mb-5">
          <label
            for="condition"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Condition</label
          >
          <select
            id="condition"
            v-model="form.condition"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="" disabled>Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Bad">Bad</option>
            <option value="Broken">Broken</option>
          </select>
        </div>

        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
</template>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
}
.form {
  position: relative;
  padding: 3rem;
  background-color: rgb(31 41 55);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 999;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
