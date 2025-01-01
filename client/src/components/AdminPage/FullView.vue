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
  <div class="md:columns-3 columns-1 gap-4 mt-6">
    <div
      v-for="item in Items"
      :key="item._id"
      class="relative rounded-lg shadow mb-5 bg-neutral-900 hover:border-current transition-all hover:bg-gray-800 break-inside-avoid"
    >
      <div class="absolute top-3 right-3 z-10">
        <button
          @click="toggleDropdown(item._id)"
          class="bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 focus:outline-none"
        >
          <i class="pi pi-ellipsis-h"></i>
        </button>
        <div
          v-if="dropdownStates[item._id]"
          class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
          <button
            @click="navigateToEditPage(item._id)"
            class="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-700 hover:text-white rounded-lg transition-all delay-150"
          >
            Edit
          </button>
          <button
            @click="deleteItem(item._id)"
            class="transition-all delay-150 block w-full px-4 py-2 text-left bg-transparent hover:bg-red-600 text-rose-600 hover:text-white rounded-lg"
          >
            Remove
          </button>
        </div>
      </div>

      <div class="p-5">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ item.name }}
        </h5>
        <p class="text-xl text-gray-700 dark:text-gray-400">
          Amount: {{ item.amount }}
        </p>
        <p class="text-xl text-gray-700 dark:text-gray-400">
          Condition: {{ item.condition }}
        </p>
        <p class="text-xl text-gray-700 dark:text-gray-400">
          Registered At: {{ item.created_at }}
        </p>
      </div>
    </div>
  </div>
</template>
