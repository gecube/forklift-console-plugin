import * as React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { VMMigrationDetails } from '@app/Plans/components/VMMigrationDetails';

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FunctionComponent = () => (
  <QueryClientProvider client={queryClient}>
    <VMMigrationDetails />
    {process.env.NODE_ENV !== 'test' ? <ReactQueryDevtools /> : null}
  </QueryClientProvider>
);

export default App;
