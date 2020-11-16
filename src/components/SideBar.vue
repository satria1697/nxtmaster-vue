<template>
  <div class="sidenav" :class="{ closeSide: isSideBar }">
    <!-- <div class="user">
      <div class="img-container">
        <img
          v-if="avatar === null"
          src="@/assets/image/table/blank_avatar.png"
        />
        <img v-else :src="avatar" />
      </div>
      <div class="user-name"><span v-if="!isSideBar">{{ fullname }}</span></div>
    </div> -->
    <div class="sidenav-list" :class="computedClass('Home')">
      <router-link to="/">
        <span class="span-side">
          <i class="fas fa-home"></i>
          <span class="" v-if="!isSideBar"> Home</span>
        </span>
      </router-link>
    </div>
    <!-- <div class="sidenav-list" :class="computedClass('datauser')">
      <router-link :to="{ name: 'datauser' }"
        ><i class="fas fa-caret-square-right"></i>
        <span v-if="!isSideBar"> Data User</span></router-link
      >
    </div> -->
    <div class="sidenav-list" v-for="sb in sideBar" :key="sb.id">
      <div class="sidenav-list" :class="computedClass(sb.path)">
        <router-link :to="{ name: sb.path }">
          <i class="fas fa-caret-square-right span-theme"></i
          ><span v-if="!isSideBar"> {{ sb.name }} </span></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import store from "../store";
export default {
  props: {
    avatarProps: {
      type: String
    }
  },
  data() {
    let self = this;
    return {
      avatar: self.avatarProps,
      fullname: store.getters["getFullname"],
      isSideBar: false,
      isActive: false,
      sideBar: []
    };
  },
  created() {
    let self = this;
    store.watch(
      state => {
        return state.isSideBar;
      },
      () => {
        self.isSideBar = store.state.isSideBar;
      },
      {
        deep: true
      }
    );
  },
  mounted() {
    let self = this;
    self.getSidebar();
  },
  methods: {
    computedClass(routeName) {
      let className = "isActive";
      let self = this;
      if (routeName === self.$route.name) {
        return className;
      }
    },
    getSidebar() {
      let self = this;
      Axios.get("http://127.0.0.1:8000/api/sidebar")
        .then(resp => {
          self.sideBar = resp.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    "$route.name": {
      handler(name) {
        let self = this;
        self.computedClass(name);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.sidenav {
  height: 100vh;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  // background-color: rgba($color: black, $alpha: 0.5);
  background-color: #222222;
  overflow-x: hidden;
  padding-top: 50px;
  margin-right: 15px;
  // margin-top: 50px;
  &-list {
    margin: 10px 5px;
  }
  transition: 0.2s;
}
.span-side {
  color: white;
}
.closeSide {
  width: 45px;
  .sidenav-list {
    a {
      .fas {
        text-align: center;
        width: 100%;
      }
    }
  }
}
.user {
  margin: 7px;
  display: grid;
  grid-template-columns: 35px 180px;
  .img-container {
    img {
      width: 30px;
      height: 30px;
    }
  }
  &-name {
    span {
      font-size: 13px;
    }
  }
}
</style>
