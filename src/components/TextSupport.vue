<template>
  <div class="support" @click="toggleSupportDropdown">
    {{ $t("support") }}
  </div>

  <div v-if="showSupportDropdown" class="backdrop"></div>

  <div class="support-dropdown" v-if="showSupportDropdown" v-click-outside="hide">
    <div class="form" v-if="!isLoading">
      <div class="form-item left">
        <h1 class="title">{{ $t("support") }}</h1>
        <p class="text">{{ $t("supportText") }}</p>
      </div>
      <div class="form-item left">
        <label class="label" for="type">{{ $t("type") }}</label>
        <select class="input mt-sm" id="type" v-model="createTicketInput.type">
          <option value="bug" selected>{{ $t("reportBug") }}</option>
          <option value="feature">{{ $t("askFeature") }}</option>
          <option value="info">{{ $t("askInformations") }}</option>
        </select>
      </div>
      <div class="form-item left">
        <label class="label" for="description">{{ $t("message") }}</label>
        <textarea class="input mt-sm" id="description" required :placeholder="$t('message')" v-model="createTicketInput.description"></textarea>
      </div>
      <div class="form-item">
        <button class="btn-primary fullwidth" @click="sendTicket">{{ $t("send") }}</button>
      </div>
    </div>
    <Loader :isText="false" v-else/>
  </div>
</template>

<script>
import createTicket from "@/graphql/mutations/createTicket.gql";
import Loader from "@/components/Loader.vue";

export default {
  name: "TextSupport",
  components: {Loader},
  data() {
    return {
      showSupportDropdown: false,
      createTicketInput: {
        type: "bug",
        description: "",
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    toggleSupportDropdown() {
      this.showSupportDropdown = !this.showSupportDropdown;
    },
    hide() {
      this.showSupportDropdown = false;
    },
    async sendTicket() {
      this.$store.dispatch("loading", true);
      if (this.createTicketInput.description === "") {
        this.$store.dispatch("loading", false);
        this.$swal({
          title: this.$t("messageRequired"),
          icon: "error",
        });
        return;
      }
      this.$apollo.mutate({
        mutation: createTicket,
        variables: {
          ticket: this.createTicketInput
        }
      }).then(() => {
        this.$store.dispatch("loading", false);
        this.$swal({
          title: this.$t("supportSuccess"),
          icon: "success",
        });
        this.showSupportDropdown = false;
      }).catch(() => {
        this.$store.dispatch("loading", false);
        this.$swal({
          title: this.$t("supportError"),
          icon: "error",
        });
        this.showSupportDropdown = false;
      });
    },
  }
};
</script>

<style scoped lang="scss">
.support {
  width: 100%;
  display: flex;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-primary);
  }
}

// place the dropdown in the center of the screen

.support-dropdown {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  background-color: var(--bg-primary);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  z-index: 1000;
}
</style>