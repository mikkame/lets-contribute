<template lang="pug">
  div
    section
      aside
        h1 Let's Contribute!
        h2 日本語でコントリビュートできるIssue 集めました
      aside

        label プログラミング言語

        select(v-model="lang", placeholder="選択してね", @change="changeLang")
          option(disabled, selected) 選択してね
          option(v-for="lang in languages") {{lang}}
    section#issues
      Issues(v-for="issue in issues", :key="issue.title", :data="issue")
    section
      button(@click="paginate", v-if="issues.length") さらに読み込む
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import languages from '@/languages'
import Issues from '@/components/Issues.vue'
import { GithubIssue, GithubResponse } from '@/@types/Github'
import axios from 'axios'

class Label {
  public name: string;
  public active = false;
  constructor (name: string, active?: boolean) {
    this.name = name
    this.active = active || false
  }
}

@Component({
  components: {
    Issues
  }
})

export default class App extends Vue {
  public page=1;
  public languages: Array<string> = languages;
  public lang = '';
  public labels: Array<Label> = [new Label('good first issue', true), new Label('help wanted')]
  public issues: Array<GithubIssue> = []

  public changeLang (): void {
    this.issues = []
    this.page = 1
    this.getIssues()
  }

  public paginate (): void {
    this.page++
    this.getIssues()
  }

  public async getIssues (): Promise<void> {
    const baseQuery: string = [
      'is:issue',
      'is:open',
      `language:"${this.lang}"`
    ].concat(this.labels.filter((label: Label): boolean => {
      return label.active
    }).map((label: Label): string => {
      return `label:"${label.name}"`
    }).join(' ')).join(' ')

    const result: Array<GithubResponse> = await Promise.all('いん'.split('').map((char: string): Promise<GithubResponse> => {
      return axios.get(`https://api.github.com/search/issues?q=${baseQuery}%20${char}`, {
        params: {
          page: this.page,
          sort: 'created',
          order: 'desc'
        }
      })
    }))

    result.map((response) => {
      response.data.items.map((issue: GithubIssue) => {
        if (this.issues.filter((alreadyIssue) => {
          return alreadyIssue.id === issue.id
        }).length === 0) {
          this.issues.push(issue)
        }
      })
    })
  }
}
</script>
<style lang="scss">
  #issues aside {
    width: 60%;
  }
  p label {
    display: inline;
    padding: 2px;
    margin: 3px;
  }
</style>
