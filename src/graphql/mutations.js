import { gql } from '@apollo/client';

export const SIGN_IN = gql`
mutation Authorize($credentials: AuthorizeInput) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;