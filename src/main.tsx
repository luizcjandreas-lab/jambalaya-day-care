import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { prefersReducedMotion } from './hooks/useReducedMotion';
import './styles/index.css';

const root = document.documentElement;
root.lang = 'pt-BR';

// As entradas animadas só são ativadas quando há suporte e o visitante
// não pediu movimento reduzido — sem isso, todo o conteúdo já aparece pronto.
if (!prefersReducedMotion() && 'IntersectionObserver' in window) {
  root.classList.add('js-reveal');
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
