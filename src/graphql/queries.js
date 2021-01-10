import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query {
    repositories {
      edges {
        node {
            id
            fullName
            description
            language
            ownerAvatarUrl
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      id
      watchersCount
      ownerName
      fullName
      forksCount
      authorizedUserHasReviewed
      reviewCount
      ownerAvatarUrl
      openIssuesCount
      language
      stargazersCount
      ratingAverage
      url
      description
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const AUTHORIZE_USER = gql`
query authorizedUser {
    authorizedUser {
      id
      username
    }
  }`;