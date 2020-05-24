<template lang="pug">
  aside
    div.summary(:class="{ active: open }")
      p
        a(:href='`http://github.com/${repoName}`', target='_blank', rel="noopener noreferrer")
          | {{repoName}}
          ExternalLinkIcon
      h3
        a(:href='data.html_url', target='_blank', rel="noopener noreferrer")
          | {{data.title}}
          ExternalLinkIcon
      p
        label(v-for='label in data.labels', :style="{backgroundColor: '#'+label.color}") {{label.name}}
        | created at {{data.created_at}}
    hr
    div.description(:class='{active:open}')
      .readmore(@click="showToggle") もっと読む
      div(v-html="renderMD(data.body)")
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator'
import { Marked, escape, Renderer } from 'marked-ts'
import { GithubIssue } from '@/@types/Github'
import ExternalLinkIcon from '@/components/ExternalLinkIcon.vue'
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
  components: {
    ExternalLinkIcon
  }
})

export default class Issues extends Vue {
  @Prop()
  data!: GithubIssue

  open = false

  public get repoName (): string {
    const match = this.data.repository_url.match(/repos\/(.*)$/)
    if (match?.length) {
      return match[1]
    }
    return ''
  }

  public renderMD (markdown: string): string {
    return Marked.parse(escape(markdown))
  }

  public showToggle (): void {
    this.open = !this.open
  }
}
</script>
<style lang="scss">
  .summary {
    position: relative;
    cursor: pointer;
  }
  .description {
    position: relative;
    height: 100px;
    overflow: hidden;
    animation-duration: 2s;
    & .readmore {
      text-align: center;
      display: block;
      width: 100%;
      position: absolute;
      background: linear-gradient(to top, rgba(255,255,255,1) 20%,rgba(255,255,255,0) 100%);
      height: 100px;
      line-height: 150px;
      cursor: pointer;
    }
  }
  .description.active {
    height: auto;
    & .readmore {
      opacity: 0;
    }
  }

</style>
