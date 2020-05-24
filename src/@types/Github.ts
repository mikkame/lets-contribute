export interface GithubLabel {
  color: string;
  name: string;
}
export interface GithubIssue {
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
export interface GithubResponse {
  items: Array<GithubIssue>;
}
