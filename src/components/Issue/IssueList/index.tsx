import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  ISSUE_STATES_ENUM,
  IssueListProps,
  IssueProps,
  TRANSITION_STATE,
  TRANSITION_LABELS,
  IssuesFilterProps,
} from "./types";
import { GET_ISSUES_OF_REPOSITORY } from "./queries";
import ErrorMessage from "../../Error";
import Loading from "../../Loading";
import IssueItem from "../IssueItem";
import Button, { ButtonUnobtrusive } from "../../Button";

const Issues = ({ repositoryName, repositoryOwner }: IssueProps) => {
  const [issuesState, setIssuesState] = useState(ISSUE_STATES_ENUM.OPEN);
  const [showIssues, setShowIssues] = useState(false);
  const { data, loading, error, client } = useQuery(GET_ISSUES_OF_REPOSITORY, {
    variables: {
      repositoryName,
      repositoryOwner,
      issuesState,
    },
    skip: showIssues === false,
  });

  const toggleIssuesState = (nextIssueState: ISSUE_STATES_ENUM) =>
    setIssuesState(nextIssueState);

  const onToggleShowIssues = (state: boolean) => setShowIssues(state);

  const onPreFetchIssues = (issuesState: ISSUE_STATES_ENUM) => {
    client.query({
      query: GET_ISSUES_OF_REPOSITORY,
      variables: {
        repositoryName,
        repositoryOwner,
        issuesState,
      },
    });
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading && !data?.repository) {
    return <Loading isCenter={true} />;
  }

  return (
    <div className="Issues">
      <IssuesFilter
        showIssues={showIssues}
        onToggleIssues={onToggleShowIssues}
        onPreFetchIssues={() => onPreFetchIssues(issuesState)}
      />
      {showIssues ? (
        !data.repository.issues.edges.length ? (
          <div className="IssueList">No issues...</div>
        ) : (
          <>
            <Button
              onClick={() => toggleIssuesState(TRANSITION_STATE[issuesState])}
              onMouseOver={() =>
                onPreFetchIssues(TRANSITION_STATE[issuesState])
              }
            >
              {TRANSITION_LABELS[issuesState]}
            </Button>
            <IssuesList issues={data.repository.issues.edges} />
          </>
        )
      ) : null}
    </div>
  );
};

const IssuesList = ({ issues }: IssueListProps) => {
  return (
    <div className="IssueList">
      {issues.map((issue) => (
        <IssueItem key={issue.node.id} issue={issue.node} />
      ))}
    </div>
  );
};

const IssuesFilter = ({
  showIssues,
  onToggleIssues,
  onPreFetchIssues,
}: IssuesFilterProps) => (
  <ButtonUnobtrusive
    onClick={() => onToggleIssues(!showIssues)}
    onMouseOver={onPreFetchIssues}
  >
    {showIssues ? "Close issues" : "Open issues"}
  </ButtonUnobtrusive>
);

export default Issues;
