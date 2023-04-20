import { gql } from "@apollo/client";

export const GET_ISSUES_OF_REPOSITORY = gql`
  query($repositoryName: String!, $repositoryOwner: String!, $cursor: String) {
    repository(owner: $repositoryOwner, name: $repositoryName ) {
      issues(first: 5, after: $cursor) {
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
