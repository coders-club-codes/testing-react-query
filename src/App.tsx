import { QueryClientProvider } from 'react-query';

import { MainPage } from './pages/MainPage';
import { queryClient } from './services';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
