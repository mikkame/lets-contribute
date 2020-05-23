<template lang="pug">
  aside
    div.summary(:class="{ active: flag }", @click="showToggle")
      h3
        a(:href='data.html_url', target='_blank', rel="noopener noreferrer") [外部リンク]{{data.title}}
      p
        label(v-for='label in data.labels', :style="{backgroundColor: '#'+label.color}") {{label.name}}
        | created at {{data.created_at}}
    div.description(v-if="flag")
      hr
      div(v-html="renderMD(data.body)")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Marked, escape, Renderer } from 'marked-ts'

Marked.setOptions({
  renderer: new Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

@Component({
  props: {
    data: Object
  }
})

export default class Issues extends Vue {
  flag = false

  public renderMD (markdown: string): string {
    return Marked.parse(escape(markdown))
  }

  public showToggle (): void {
    this.flag = !this.flag
  }
}
</script>
<style lang="scss">
  .summary {
    position: relative;
    cursor: pointer;

    &::after {
      content: "\025bc";
      font-size: 16px;
      position: absolute;
      right: 0;
      top: calc(50% - 8px);
    }

    &.active {
      &::after {
        content: "\025b2";
      }
    }
  }
</style>
