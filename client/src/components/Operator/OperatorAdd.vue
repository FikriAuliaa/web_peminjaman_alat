<template>
  <div class="overlay">
    <div class="form md:w-2/4 w-5/6">
      <button @click="onClose" class="close-button">X</button>
      <h1 class="mb-3 text-white text-center md:text-2xl text-xl">
        New Operator Form
      </h1>
      <form class="max-w-md mx-auto" @submit.prevent="submitForm">
        <div class="mb-5">
          <label
            for="image"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Image URL</label
          >
          <input
            type="text"
            id="image"
            v-model="form.image"
            placeholder="https://example.com/image.jpg (Put Your Best Pic Here)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
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
            placeholder="Jonathan Doe"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="Email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            type="text"
            id="Email"
            v-model="form.Email"
            placeholder="example@example.com"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="age"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Age</label
          >
          <input
            type="number"
            id="age"
            placeholder="25"
            v-model="form.age"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            min="0"
          />
        </div>
        <div class="mb-5">
          <label
            for="NoTelp"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Phone Number</label
          >
          <input
            type="text"
            id="NoTelp"
            v-model="form.NoTelp"
            placeholder="+1-123-456-7890"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "OperatorAdd",
  setup() {
    const operatorData = ref({ name: "", email: "" });
    const addOperator = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/operator`,
          operatorData.value,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Operator successfully added!");
      } catch (error) {
        console.error("Error adding operator:", error);
        alert("Failed to add operator. Please try again.");
      }
    };
    return {
      operatorData,
      addOperator,
    };
  },
};
</script>

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
