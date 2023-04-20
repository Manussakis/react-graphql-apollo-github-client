export interface IssueProps {
  repositoryName: string;
  repositoryOwner: string;
}

export interface Issue {
  id: string;
  number: number;
  state: string;
  title: string;
  url: string;
  bodyHTML: string;
}

interface nodeIssue {
  node: Issue
}

export interface IssueListProps {
  issues: nodeIssue[];
}
