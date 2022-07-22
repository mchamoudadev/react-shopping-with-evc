import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ShopProvider } from './ShopContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ShopProvider>

        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ShopProvider>

);