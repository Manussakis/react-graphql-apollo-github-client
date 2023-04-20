import { useQuery } from "@apollo/client";
import { IssueListProps, IssueProps } from "./types";
import { GET_ISSUES_OF_REPOSITORY } from "./queries";
import ErrorMessage from "../../Error";
import Loading from "../../Loading";
import IssueItem from "../IssueItem";

const IssueList = ({ issues }: IssueListProps) => (
  <div className="IssueList">
    {issues.map((issue) => (
      <IssueItem issue={issue.node} />
    ))}
  </div>
);

const Issues = ({ repositoryName, repositoryOwner }: IssueProps) => {
  const { data, loading, error } = useQuery(GET_ISSUES_OF_REPOSITORY, {
    variables: {
      repositoryName,
      repositoryOwner,
    },
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading && !data?.repository) {
    return <Loading isCenter={true} />;
  }

  if (!data.repository.issues.edges.length) {
    return <div className="IssueList">No issues ...</div>;
  }

  return <IssueList issues={data.repository.issues.edges} />;
};

export default Issues;
