import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query ($orderBy: AllRepositoriesOrderBy $orderDirection: OrderDirection $searchKeyword: String $first: Int $after:String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
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
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      totalCount
      hasNextPage
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

export const GET_REVIEWS = gql`
query($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
    id
    fullName
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repositoryId
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}`;