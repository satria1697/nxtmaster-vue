<template>
  <div class="pdf-sub">
    <!-- <input type="checkbox" v-model="show" /> -->
    <!-- <select v-model="src" style="width: 30em">
      <option v-for="item in pdfList" :value="item" v-text="item"></option>
    </select> -->
    <div class="form-group">
      <input
        v-model.number="page"
        type="number"
        class="form-control-row"
      /><span>/{{ numPages }} </span>
      <button @click="rotate += 90" class="form-control-row btn btn-primary">
        &#x27F3;
      </button>
      <button @click="rotate -= 90" class="form-control-row btn btn-primary">
        &#x27F2;
      </button>
      <button @click="$refs.pdf.print()" class="form-control-row btn btn-info">
        print
      </button>
    </div>
    <div class="pdf-viewer">
      <div
        v-if="loadedRatio > 0 && loadedRatio < 1"
        style="background-color: green; color: white; text-align: center"
        :style="{ width: loadedRatio * 100 + '%' }"
      >
        {{ Math.floor(loadedRatio * 100) }}%
      </div>
      <pdf
        class="container"
        ref="pdf"
        :src="src"
        :page="page"
        :rotate="rotate"
        @progress="loadedRatio = $event"
        @num-pages="numPages = $event"
        @link-clicked="page = $event"
      ></pdf>
    </div>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  props: ["src"],
  components: {
    pdf: pdf
  },
  data() {
    return {
      // show: true,
      // src: "",
      loadedRatio: 0,
      page: 1,
      numPages: 0,
      rotate: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  display: grid;
  // align-content: end;
  // justify-content: end;
  // width: 300px;
  grid-template-columns: 100px 1fr 40px 40px 80px;
}
.pdf-sub {
  padding: 30px;
  background-color: lightgrey;
}
.pdf-viewer {
  width: 100%;
}
.container {
  // margin: 10px 0;
  padding: 0;
  border: 1px solid rgba($color: black, $alpha: 0.4);
}
.btn {
  font-size: 14px;
}
</style>
