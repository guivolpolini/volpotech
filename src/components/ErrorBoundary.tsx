import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07070a] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-bold text-xl mb-4">
            V
          </div>
          <h1 className="text-2xl font-bold mb-2">Carregando VolpoTech...</h1>
          <p className="text-sm text-gray-400 max-w-sm mb-6">
            Detectamos dados antigos no cache do seu navegador. Clique abaixo para atualizar a página.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-xl shadow-primary/30 transition-all"
          >
            Atualizar agora
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
