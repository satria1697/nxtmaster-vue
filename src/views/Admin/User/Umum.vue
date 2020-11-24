<template>
  <div class="detail">
    <div class="row">
      <div class="form-group col-3">
        <div class="img-container">
          <img v-if="dataAll.avatar" :src="dataAll.avatar" />
          <img v-else src="@/assets/image/table/blank_avatar.png" />
          <div class="form-group">
            <label for="fileInputForm">
              <span class="fa-stack fa-2x pointer">
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
      <div class="col-9">
        <div class="row">
          <div class="form form-group col-8">
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
          <div class="form form-group col-8">
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
          <div class="form form-group col-8">
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
          <div class="form form-group col-8">
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
          <div class="form form-group col-7">
            <label for="formAlamat" class="top">Alamat</label>
            <input
              id="formAlamat"
              class="bottom form-control"
              type="text"
              v-model="dataAll.companyaddress"
              v-on:focus="resetSpan()"
            />
          </div>
          <div class="form form-group col-4">
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
          <div class="form form-group col-4">
            <label for="formPhone" class="top">No Telepon</label>
            <input
              id="formPhone"
              class="bottom form-control"
              type="text"
              v-model="dataAll.companyphone"
              v-on:focus="resetSpan()"
            />
          </div>
          <div class="form form-group col-4">
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
          <div class="form form-group col-4">
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
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../../api";

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
    let self = this;
    self.init();
  },
  methods: {
    init() {
      let self = this;
      self.getDataUmum();
    },
    getDataUmum(params) {
      let self = this;
      api.umum
        .filter(params)
        .then(resp => {
          if (resp.data.status === "success") {
            self.dataAll = resp.data.data[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectImage(e) {
      let self = this;
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function() {
        let image64 = reader.result;
        self.dataAll.avatar = image64;
      };
      reader.readAsDataURL(image);
    }
  }
};
</script>

<style lang="scss" scoped>
.img-container {
  text-align: center;
  span {
    position: absolute;
    bottom: 80px;
    left: 100px;
  }
  img {
    width: 200px;
    height: 200px;
  }
}
</style>
