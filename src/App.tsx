import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';

function AppContent() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="App">
      {isAuthenticated ? <Dashboard /> : <LoginForm />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;