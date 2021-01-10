import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation Authorize($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      user {
        username
        id
      }
      repository {
        id
        ownerName
      }
      rating
      createdAt
      text
    }
  }
`;