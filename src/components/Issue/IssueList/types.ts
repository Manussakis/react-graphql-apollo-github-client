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
  node: Issue;
}

export interface IssueListProps {
  issues: nodeIssue[];
}

export interface IssuesFilterProps {
  showIssues: boolean;
  onToggleIssues: (showIssues: boolean) => void;
  onPreFetchIssues: () => void;
}

export enum ISSUE_STATES_ENUM {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export const TRANSITION_LABELS = {
  [ISSUE_STATES_ENUM.OPEN]: "Show Closed Issues",
  [ISSUE_STATES_ENUM.CLOSED]: "Show Open Issues",
};

export const TRANSITION_STATE = {
  [ISSUE_STATES_ENUM.OPEN]: ISSUE_STATES_ENUM.CLOSED,
  [ISSUE_STATES_ENUM.CLOSED]: ISSUE_STATES_ENUM.OPEN,
};
