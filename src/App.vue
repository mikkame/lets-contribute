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
      aside(v-for="issue in issues")
        h3
          a(:href='issue.html_url', target='_blank', rel="noopener noreferrer") [外部リンク]{{issue.title}}
        p
          label(v-for='label in issue.labels', :style="{backgroundColor: '#'+label.color}") {{label.name}}
          | created at {{issue.created_at}}
        hr
        div(v-html="renderMD(issue.body)")
    section
      button(@click="paginate", v-if="issues.length") さらに読み込む
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import languages from '@/languages'
import axios from 'axios'
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

interface GithubLabel {
  color: string;
  name: string;
}
interface GithubIssue {
    assignee: undefined;
    assignees: undefined;
    author_association: string;
    body: string;
    closed_at: null;
    comments: 1;
    comments_url: string;
    created_at: string;
    events_url: string;
    html_url: string;
    id: number;
    labels: Array<GithubLabel>;
    labels_url: string;
    locked: boolean;
    milestone: string | null;
    node_id: string;
    number: number;
    repository_url: string;
    score: number;
    state: string;
    title: string;
    updated_at: string;
}
interface GithubResponse {
  data: {
    items: Array<GithubIssue>;
  };
}
class Label {
  public name: string;
  public active = false;
  constructor (name: string, active?: boolean) {
    this.name = name
    this.active = active || false
  }
}

@Component
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

  public renderMD (markdown: string): string {
    return Marked.parse(escape(markdown))
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
<style>
  #issues aside{
    width: 60%;
  }
  p label {
    display: inline;
    padding: 2px;
    margin: 3px;
  }
</style>
