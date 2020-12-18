<template>
  <div class="main" :class="{ closeSideMain: this.$store.state.isSideBar }">
    <div class="tab" v-if="!isLoading && tabState !== null">
      <div
        class="tab-item"
        v-for="(tab, index) in tabState"
        :key="index"
        :class="computedClass(tab.name)"
      >
        <div class="items" v-on:click="goTo(tab.name)">
          <span>{{ tab.label }}</span>
        </div>
        <div class="items center" v-on:click="close(index)">
          <i class="fas fa-times"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {
      tabState: [],
      isLoading: true
    };
  },
  created() {
    store.watch(
      state => {
        return state.tabState;
      },
      () => {
        this.isLoading = true;
        this.getTabStore();
        this.isLoading = false;
      },
      {
        deep: true
      }
    );
  },
  mounted() {
    this.getLocalTab();
    this.getTabStore();
    // console.log(store.getters.tabRouteName(0));
  },
  methods: {
    getLocalTab() {
      var storedTab = JSON.parse(localStorage.getItem("tabState"));
      if (storedTab.length > 0) {
        for (let index = 1; index < storedTab.length; index++) {
          store.commit("openTab", {
            name: storedTab[index].name,
            label: storedTab[index].label
          });
        }
      }
    },
    getTabStore() {
      this.tabState = this.stateTab();
    },
    stateTab() {
      return store.state.tabState;
    },
    goTo(place) {
      this.$router.push({ name: place }).catch(err => {
        err;
      });
    },
    close(index) {
      let state = store.state.tabState;
      console.log(state);
      if (state.length === 1) {
        this.closeTabAct(index);
        this.$router.push("/").catch(err => {
          err;
        });
      } else {
        if (state[index].name === this.$route.name) {
          console.log(index);
          if (index === 0) {
            this.closeTabAct(index);
            this.$router.push(state[index + 1].name);
          } else {
            this.closeTabAct(index);
            this.$router.push(state[index - 1].name);
          }
        } else {
          this.closeTabAct(index);
        }
      }
    },
    closeTabAct(id) {
      store.commit("closeTab", id);
    },
    computedClass(routeName) {
      let className = "down";

      if (routeName === this.$route.name) {
        return className;
      }
    }
  },
  watch: {
    tabState: {
      deep: true,
      handler() {
        this.isLoading = true;
        this.getTabStore();
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tab {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  margin-top: 12px;
  padding-left: 7px;
  font-size: 0.85em;
  // margin-left: 15px;
  // margin-bottom: 1px;
  // background-color: white;
  // padding: 5px;
  // height: 24px;
}
.tab-item {
  display: grid;
  grid-template-columns: 9fr 1fr;
  z-index: 99;
  background-color: darkgrey;
  color: rgb(64, 64, 64);
  margin-left: 1px;
  padding-left: 12px;
  border-radius: 7px 7px 0 0;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  border-right: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-left: 1px solid rgba(0, 0, 0, 0.4);
  // box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  height: 24px;
  cursor: pointer;
  // height: 50px;
  // gap: 10px;
  .items {
    // border-width: 1px 1px 0 1px;
    border-width: 0;
    border-color: black;
    border-style: solid;
    // border: solid black;
    // border-radius: 10px 10px 0 0;
    align-this: center;
    padding-right: 7px;
    // padding: 15px;
    // background-color: white;
  }
  .center {
    place-this: center;
  }
}
.down {
  background-color: white;
  color: black;
  font-weight: bold;
  border-bottom: none;
}
.row {
  margin-bottom: 0;
}
</style>
