<template>
  <div class="pdf-sub">
    <!-- <input type="checkbox" v-model="show" /> -->
    <!-- <select v-model="src" styles="width: 30em">
      <option v-for="item in pdfList" :value="item" v-text="item"></option>
    </select> -->
    <div class="row pdf">
      <input v-model.number="page" type="number" class="col-1" /><span
        class="col-1"
        >from {{ numPages }}
      </span>
      <button @click="rotate += 90" class="offset-6 col-1 btn btn-default">
        &#x27F3;
      </button>
      <button @click="rotate -= 90" class="col-1 btn btn-default">
        &#x27F2;
      </button>
      <button @click="printPdf()" class="col-1 btn btn-default">
        print
      </button>
    </div>
    <div class="row">
      <div class="pdf-viewer">
        <div
          v-if="loadedRatio > 0 && loadedRatio < 1"
          style="background-color: green; color: white; text-align: center"
          :style="{ width: loadedRatio * 100 + '%' }"
        >
          {{ Math.floor(loadedRatio * 100) }}%
        </div>
        <pdf
          class="pdf-container"
          ref="pdf"
          :src="pdfsrc"
          :page="page"
          :rotate="rotate"
          @progress="loadedRatio = $event"
          @num-pages="numPages = $event"
          @link-clicked="page = $event"
        ></pdf>
      </div>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  props: {
    src: {
      type: String
    },
    title: {
      type: String
    }
  },
  components: {
    pdf: pdf
  },
  data() {
    return {
      // show: true,
      pdfsrc: "",
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0
    };
  },
  mounted() {
    this.getPdfSrc();
  },
  methods: {
    getPdfSrc() {
      var raw = window.atob(this.src);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));

      for (var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }

      this.pdfsrc = array;
    },
    printPdf() {
      document.title = this.title;
      this.$refs.pdf.print();
    }
  },
  watch: {
    src: function() {
      this.getPdfSrc();
    }
  }
};
</script>

<style lang="scss" scoped>
.pdf-sub {
  padding: 30px;
  background-color: lightgrey;
  margin: 10px auto 5px;
}
.pdf {
  margin: 0 auto;
  &-viewer {
    width: 100%;
  }
  &-container {
    margin: 10px 0;
    padding: 0;
    border: 1px solid rgba($color: black, $alpha: 0.4);
  }
}
</style>
