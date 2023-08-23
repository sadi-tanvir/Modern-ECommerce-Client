"use client"
import Header from './components/header/Header'
import './globals.css'
import { Mulish } from 'next/font/google';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';


const mulish = Mulish({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`
});

const authLink = setContext(async (_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('accessToken') as string);
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <Header />
            {children}
          </Provider>
        </ApolloProvider>
      </body>
    </html>
  )
}
