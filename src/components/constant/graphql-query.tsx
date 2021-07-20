import {gql} from "@apollo/client";
/* GraphQL Query */

/* For Users */

const getUsers = gql`
  query ($queryString: String!) {
    search(query: $queryString, type: USER, first: 20) {
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on User {
            id
            email
            bio
            name
            location
          }
        }
      }
      userCount
    }
  }`


const getRepositories = gql`
query ($queryString: String!) {
  search(query: $queryString, type: REPOSITORY, first: 20) {
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
    edges {
      node {
        ... on Repository {
          id
          name
          description
          licenseInfo {
            key
          }
          updatedAt
          stargazerCount
          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              name
              color
            }
          }
        }
      }
    }
    repositoryCount
  }
}`;


export { getUsers, getRepositories };