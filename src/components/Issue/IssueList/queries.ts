import { gql } from "@apollo/client";

export const GET_ISSUES_OF_REPOSITORY = gql`
  query Issues (
    $repositoryName: String!
    $repositoryOwner: String!
    $issuesState: IssueState!
    $cursor: String
  ) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      id
      issues(first: 5, states: [$issuesState], after: $cursor) {
        edges {
          node {
            id
            number
            state
            title
            url
            bodyHTML
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
