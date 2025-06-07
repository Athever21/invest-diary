import { gql } from '@apollo/client';

export const GET_TRADE = gql`
 query getUserTrades($tradeId: String!) {
  getUserTrade(tradeId: $tradeId) { 
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
}
`;