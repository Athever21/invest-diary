import { gql } from '@apollo/client';

export const GET_TRADES = gql`
 query getUserTrades($filters: TradeFilters!) {
  getUserTrades(filters: $filters) {
    trades {
      id
      title
      asset
      status
      enterDate
      closeDate
      enterPrice
      closePrice
      volume
      images {
        url
        name
      }
    }
    totalItems
    totalPages
    currentPage
  }
}
`;