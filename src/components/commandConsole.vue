<template>
  <TransitionRoot :show="open" as="template" @after-leave="query = ''" appear>
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-tertiary bg-opacity-25 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="mx-auto max-w-xl transform rounded-xl bg-secondary p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
          >
            <Combobox @update:modelValue="onSelect">
              <ComboboxInput
                class="w-full rounded-md border-0 bg-base px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                @change="query = $event.target.value"
              />

              <ComboboxOptions
                v-if="filteredPeople.length > 0"
                static
                class="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                <ComboboxOption
                  v-for="person in filteredPeople"
                  :key="person.id"
                  :value="person"
                  as="template"
                  v-slot="{ active }"
                >
                  <li
                    :class="[
                      'cursor-default select-none rounded-md px-4 py-2',
                      active && 'bg-indigo-600 text-white',
                    ]"
                  >
                    {{ person.name }}
                  </li>
                </ComboboxOption>
              </ComboboxOptions>

              <div
                v-if="query !== '' && filteredPeople.length === 0"
                class="py-14 px-4 text-center sm:px-14"
              >
                <UsersIcon
                  class="mx-auto h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p class="mt-4 text-sm text-gray-900">
                  No people found using that search term.
                </p>
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { UsersIcon } from "@heroicons/vue/24/outline";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

function onSelect(person) {
  window.location = person.url;
}

export default {
  name: "command-console",
  components: {
    Combobox,
    ComboboxInput,
    ComboboxOptions,
    ComboboxOption,
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
    UsersIcon,
  },
  data() {
    return {
      open: false,
      query: "",
      people: [
        {
          id: 1,
          name: "Wade Cooper",
          url: "#",
        },
        {
          id: 2,
          name: "Arlene Mccoy",
          url: "#",
        },
        {
          id: 3,
          name: "Devon Webb",
          url: "#",
        },
        {
          id: 4,
          name: "Tom Cook",
          url: "#",
        },
      ],
      onSelect,
    };
  },
  computed: {
    filteredPeople() {
      return this.people.filter((person) =>
        person.name.toLowerCase().includes(this.query.toLowerCase()),
      );
    },
  },
  created() {
    window.addEventListener("keydown", (event) => {
      if (event.metaKey && event.key === "k") {
        this.open = !this.open;
      }
    });
  },
};
</script>
