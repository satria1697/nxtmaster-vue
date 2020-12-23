<template>
  <div class="container-fluid">
    <div class="row">
      <div class="form-group col-md-3">
        <div class="img-container">
          <img v-if="dataAll.avatar" :src="dataAll.avatar" />
          <img v-else src="../../assets/image/table/blank_avatar.png" />
          <div
            class="form-group"
            v-if="this.$store.getters['getLevelId'] === 1"
          >
            <label for="fileInputForm">
              <span class="fa-stack fa-2x pointer-event">
                <i class="fa fa-circle fa-stack-2x" aria-hidden="true"></i>
                <i
                  class="fas fa-camera fa-stack-1x fa-inverse"
                  aria-hidden="true"
                ></i>
              </span>
              <input
                id="fileInputForm"
                type="file"
                class="d-none"
                @change="selectImage"
                accept="image/*"
              />
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="form form-group col-md-6">
            <label for="formHeader1" class="top">Header 1</label>
            <input
              id="formHeader1"
              class="bottom form-control"
              type="text"
              v-model="dataAll.header1"
              v-on:focus="resetSpan()"
            />
          </div>
        </div>
        <div class="row">
          <div class="form form-group col-md-6">
            <label for="formHeader2" class="top">Header 2</label>
            <input
              id="formHeader2"
              class="bottom form-control"
              type="text"
              v-model="dataAll.header2"
              v-on:focus="resetSpan()"
            />
          </div>
        </div>
        <div class="row">
          <div class="form form-group col-md-6">
            <label for="formCode" class="top">Kode Perusahaan</label>
            <input
              id="formCode"
              class="bottom form-control"
              type="text"
              v-model="dataAll.companycode"
              v-on:focus="resetSpan()"
            />
          </div>
        </div>
        <div class="row">
          <div class="form form-group col-md-8">
            <label for="formNama" class="top">Nama Perusahaan</label>
            <input
              id="formNama"
              class="bottom form-control"
              type="text"
              v-model="dataAll.companyname"
              v-on:focus="resetSpan()"
            />
          </div>
        </div>
        <div class="row">
          <div class="form form-group col-md-5">
            <label for="formAlamat" class="top">Alamat</label>
            <input
              id="formAlamat"
              class="bottom form-control"
              type="text"
              v-model="dataAll.companyaddress"
              v-on:focus="resetSpan()"
            />
          </div>
          <div class="form form-group col-md-3">
            <label for="formCity" class="top">Kota/Kabupaten</label>
            <input
              id="formCity"
              class="bottom form-control"
              type="text"
              v-model="dataAll.companycity"
              v-on:focus="resetSpan()"
            />
          </div>
        </div>
        <div class="row">
          <div class="form form-group col-md-4">
            <label for="formPhone" class="top">No Telepon</label>
            <input
              id="formPhone"
              class="bottom form-control"
              type="text"
              v-model="dataAll.companyphone"
              v-on:focus="resetSpan()"
            />
          </div>
          <div class="form form-group col-md-4">
            <label for="formFax" class="top">No Fax</label>
            <input
              id="formFax"
              class="bottom form-control"
              type="text"
              v-model="dataAll.companyfax"
              v-on:focus="resetSpan()"
            />
          </div>
        </div>
        <div class="row">
          <div class="form form-group col-md-4">
            <label for="formEmail" class="top">Email</label>
            <input
              id="formEmail"
              class="bottom form-control"
              type="text"
              v-model="dataAll.companyemail"
              v-on:focus="resetSpan()"
            />
          </div>
        </div>
        <div class="row" v-if="this.$store.getters['getLevelId'] === 1">
          <div class="col">
            <button class="btn btn-default" v-on:click="register(1)">
              <i class="fas fa-save"></i>
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "../../api";

  export default {
  data() {
    return {
      dataAll: {
        header1: "",
        header2: "",
        companycode: "",
        companyname: "",
        companyaddress: "",
        companycity: "",
        companyphone: "",
        companyfax: "",
        companyemail: "",
        companyfacebookid: "",
        companytwitterid: "",
        avatar: ""
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getDataUmum();
    },
    getDataUmum(params) {
      api.umum
        .filter(params)
        .then(resp => {
          if (resp.data.status === "success") {
            this.dataAll = resp.data.data[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      let self = this;
      reader.onloadend = function() {
        self.dataAll.avatar = reader.result;
      };
    },
    register(id) {
      let rawData = {
        header1: this.dataAll.header1,
        header2: this.dataAll.header2,
        companycode: this.dataAll.companycode,
        companyname: this.dataAll.companyname,
        companyaddress: this.dataAll.companyaddress,
        companycity: this.dataAll.companycity,
        companyphone: this.dataAll.companyphone,
        companyfax: this.dataAll.companyfax,
        companyemail: this.dataAll.companyemail,
        companyfacebookid: this.dataAll.companyfacebookid,
        companytwitterid: this.dataAll.companytwitterid,
        avatar: this.dataAll.avatar
      };
      let formData = new FormData();
      for (let key in rawData) {
        formData.append(key, rawData[key]);
      }
      api.umum
        .update(id, formData)
        .then(resp => {
          if (resp.data.status === "success") {
            this.textTitle = "Data berhasil disimpan";
            this.berhasil = true;
            this.isUserModal = true;
          } else {
            this.berhasil = false;
            this.textTitle = "Terjadi kesalahan pada server";
            this.isUserModal = true;
          }
        })
        .catch(err => {
          if (err.status === 422) {
            this.textTitle =
              err.response.data.error[Object.keys(err.response.data.error)[0]];
          } else {
            this.textTitle = "Kesalahan isian, silahkan coba lagi";
          }
          this.berhasil = false;
          this.isUserModal = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.img-container {
  text-align: center;
  span {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  img {
    width: 200px;
    height: 200px;
  }
}
.detail {
  padding-top: 20px;
}
</style>
