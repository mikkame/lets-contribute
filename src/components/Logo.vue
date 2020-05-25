<template lang="pug">
  .logo
    .grasses
      Grass(v-for="n in 440")
    .inner
      h1 Let's Contribute!
      h2 日本語でコントリビュートできるIssue 集めました
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Grass from '@/components/Grass.vue'
  @Component({
    components: {
      Grass
    }
  })

export default class Logo extends Vue {

}
</script>
<style lang="scss">
  .logo {
    max-width: 1200px;
    width: 100%;
    min-height: 330px;
    text-align: center;
    position: relative;
    overflow: hidden;
    & h1 {
      font-size: 64px;
      margin: 0 0 30px 0;
    }
    & .inner {
      margin: 60px;

      color: black;
      background: rgba(255,255,255, 0.9);
      min-height: 240px;
    }
    .grasses {
      position: absolute;
      z-index: -1;
    }

  }

</style>
