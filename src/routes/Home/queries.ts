import { gql } from "@apollo/client";
import { REPOSITORY_FRAGMENT } from "../../components/Repository";

export const GET_REPOSITORIES_OF_ORGANIZATION = gql`
  query RepositoriesOfOrganizations ($organizationName: String!, $cursor: String) {
    organization(login: $organizationName) {
      id
      repositories(first: 5, after: $cursor) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;
