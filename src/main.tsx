import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App'
import { Provider } from 'react-redux';
import store from './app/store';
import { ThemeProvider } from './hooks/useTheme';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </StrictMode>,
) 
