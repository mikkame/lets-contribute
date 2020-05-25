<template lang="pug">
  .grass(:style="{backgroundColor:color}")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
  @Component({
  })

export default class Logo extends Vue {
  public get color (): string {
    const colors: Array<string> = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
    return colors[Math.floor(Math.random() * colors.length)]
  }
}
</script>
<style lang="scss">
  .grass {
    background: black;
    margin: 2px;
    height: 26px;
    width: 26px;
    float: left;
  }

</style>
