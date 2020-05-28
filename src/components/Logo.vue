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
      margin: 0;
      width: 100%;
      @media screen and ( max-width: 750px ) {
        font-size: 32px
      }
    }
    & .inner {
      margin: 60px;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-wrap: wrap;
      color: black;
      background: rgba(255,255,255, 0.9);
      min-height: 240px;
      @media screen and ( max-width: 750px ) {
        margin: 30px
      }
      h2 {
        width: 100%;
        @media screen and ( max-width: 750px ) {
          font-size: 20px
        }
      }
    }
    .grasses {
      position: absolute;
      z-index: -1;
    }

  }

</style>
