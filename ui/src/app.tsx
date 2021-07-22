import Home from 'components/pages/home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import 'styles/index.css';

const queryClient = new QueryClient();

export default function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        </BrowserRouter>
    );
}
