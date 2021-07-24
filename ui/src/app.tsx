import Home from 'components/pages/home';
import ErrorBoundaries from 'components/shared/errorBoundaries';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import 'styles/index.css';

const queryClient = new QueryClient();

export default function App() {
    return (
        <ErrorBoundaries>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Home />
                </QueryClientProvider>
            </BrowserRouter>
        </ErrorBoundaries>
    );
}
