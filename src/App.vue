<template lang="pug">
  div
    div
      section
        Logo
      section
        label プログラミング言語
        div.langs
          label(v-for='language in languages').lang
            input(type='radio', name='lang', v-model="lang", :value="language.name", @change="changeLang")
            p
              i(:class="`devicon-${language.icon}-plain colored`", v-if="language.icon")
              |{{language.name}}
    section#issues
      Issues(v-for="issue in issues", :key="issue.id", :data="issue")
    section
      button(@click="paginate", v-if="issues.length") さらに読み込む
    a(href='https://github.com/mikkame/lets-contribute', style='position:absolute;right:0;top:0', target='_blank')
      img.attachment-full.size-full(width='149', height='149', src='https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149', alt='Fork me on GitHub', data-recalc-dims='1')
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import languages, { Lang } from '@/languages'
import Issues from '@/components/Issues.vue'
import { GithubIssue, GithubResponse } from '@/@types/Github'
import axios, { AxiosResponse } from 'axios'
import Logo from '@/components/Logo.vue'
const frequentChars = 'いうんかし'
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
    Issues,
    Logo
  }
})

export default class App extends Vue {
  public page=1;
  public languages: Array<Lang> = languages;
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

    const result: AxiosResponse<GithubResponse> = await axios.get(`https://api.github.com/search/issues?q=${baseQuery}%20 ${frequentChars.split('').join(' OR ')}`, {
      params: {
        page: this.page,
        sort: 'created',
        order: 'desc'
      }
    }).catch(() => {
      alert('Github API のアクセスに失敗しました。1分あたり10回までのリクエスト制限に達しているか、Githubが障害を起こしているかこのサービスのバグです')
      return { data: {} } as AxiosResponse
    })

    result.data.items.map((issue: GithubIssue) => {
      if (this.issues.filter((alreadyIssue) => {
        return alreadyIssue.id === issue.id
      }).length === 0) {
        this.issues.push(issue)
      }
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
  .langs {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .lang {
      margin: 2px 10px;
      p {
        display: inline-block;
        margin: 0;
        padding: 5px;
        box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
        border-radius: 3px;
        &:hover {
          transition-duration: 0.3s;
          background: #ebedf0;
        }
        i {
          padding-right: 3px;
        }
      }
      input[name="lang"] {
        display: none;
      }
      input[name="lang"]:checked + p {
        background: #d2d2d2;
      }
    }
  }
</style>
