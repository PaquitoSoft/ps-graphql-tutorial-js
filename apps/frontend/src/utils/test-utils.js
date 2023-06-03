import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

import { client } from '../apollo-client';

export function renderWithProviders(children) {
  return render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ApolloProvider>
  );
}
