import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4svm9i82n3801yw0a1e9vvo/master',
  cache: new InMemoryCache(),
})
