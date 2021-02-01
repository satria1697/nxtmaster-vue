import axios from "axios";

export default {
  data() {
    return {
      dataAll: null,
      success: true,
      isDeleteModal: false,
      info: {
        isModal: false,
        text: ""
      },
      url: {
        getId: "",
        register: "",
        update: "",
        delete: ""
      }
    };
  },
  created() {
    this.eschandler();
  },
  methods: {
    eschandler() {
      const escapeHandler = e => {
        if (e.key === "Escape") {
          this.closeModal();
        }
      };
      document.addEventListener("keydown", escapeHandler);
      this.$once("hook:destroyed", () => {
        document.removeEventListener("keydown", escapeHandler);
      });
    },
    closeModal() {
      this.reset();
      this.$emit("get-data");
      this.$emit("modal-closed");
    },
    getData(id) {
      axios
        .get(this.url.getId.replace("{id}", id))
        .then(resp => {
          this.dataAll = resp.data.data;
        })
        .catch(error => {
          console.log(error);
          this.reset();
        });
    },
    register(status, id, data) {
      if (status === "submit") {
        axios
          .post(this.url.register, data)
          .then(resp => {
            if (resp.data.status === "success") {
              this.info.text = "Data berhasi disimpan";
              this.success = true;
              this.info.isModal = true;
            } else {
              this.info.text = "Input data salah, silahkan cek kembali";
              this.success = false;
              this.info.isModal = true;
            }
          })
          .catch(err => {
            console.log(err);
            this.info.text = "Input data salah, silahkan cek kembali";
            this.success = false;
            this.info.isModal = true;
          });
      } else {
        axios
          .post(this.url.update.replace("{id}", id), data)
          .then(resp => {
            if (resp.data.status === "success") {
              this.info.text = "Data berhasil diperbaharui";
              this.success = true;
              this.info.isModal = true;
            } else {
              this.info.text = "Input data salah, silahkan cek kembali";
              this.success = false;
              this.info.isModal = true;
            }
          })
          .catch(err => {
            this.info.text = "Input data salah, silahkan cek kembali";
            this.success = false;
            this.info.isModal = true;
            console.log(err);
          });
      }
    },
    deleteData(id) {
      axios
        .delete(this.url.delete.replace("{id}", id))
        .then(resp => {
          if (resp.status === 204) {
            this.info.text = "Data berhasil dihapus";
            this.success = true;
            this.info.isModal = true;
          } else {
            this.info.text = "Data gagal dihapus";
            this.success = false;
            this.info.isModal = true;
          }
        })
        .catch(err => {
          console.log(err);
          this.info.text = "Data gagal dihapus";
          this.success = false;
          this.info.isModal = true;
        });
    }
  }
};
