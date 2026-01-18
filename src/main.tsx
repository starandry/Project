import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app';
import { AppProviders } from '@/app/providers';
import { ErrorBoundary } from '@/shared/ui';
import '@/app/styles/index.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <AppProviders>
                <App />
            </AppProviders>
        </ErrorBoundary>
    </StrictMode>
);
