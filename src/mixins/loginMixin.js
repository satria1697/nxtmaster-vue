import store from "../store";

export default {
  methods: {
    loginHandler() {
      if (localStorage.token) {
        const secretKey =
          "TtGYMF5mRwzAPEJKQ7eYDB0mAQnbdW4ijXBmZMHvpAy5a78dQ4z2lzDDF65uEhQ1";
        const jwtDecode = this.$jwt.decode(
          localStorage.getItem("token"),
          secretKey
        );
        let username = jwtDecode.username;
        let fullname = jwtDecode.fullname;
        let levelid = jwtDecode.levelid;
        let id = jwtDecode.sub;
        let akses = jwtDecode.akses;
        store.commit("setLogin", { username, fullname, levelid, id, akses });
        store.commit("authenChange");
        let tabs = sessionStorage.getItem("tab" + ":" + username + ":" + akses);
        if (tabs === null) {
          this.$router.push("/");
        } else {
          this.$router.push(tabs);
        }
      }
    }
  }
};
