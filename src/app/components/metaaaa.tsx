import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

interface IState {
  account: string | null;
  error: string | null;
}

const ConnectWalletButton: React.FC = () => {
  const [state, setState] = useState<IState>({ account: null, error: null });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDarkMode(document.body.classList.contains('dark'));
    }
  }, []);

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts: string[] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        // Set the first account address
        setState({ account: accounts[0], error: null });
      } catch (err) {
        console.log(err);
      }
    } else {
      setState({ account: null, error: 'MetaMask is not installed' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button 
      onClick={connectWallet} 
      style={{ 
      padding: '2px 10px', 
      fontSize: '16px', 
      cursor: 'pointer', 
      backgroundColor: isDarkMode? '#fff' : '#121212', 
      color: isDarkMode ? '#000' : '#fff', 
      border: 'none', 
      borderRadius: '5px',
      transition: 'background-color 0.3s ease'
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = document.body.classList.contains('dark') ? '#ffcc00' : '#8c8c8c')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = document.body.classList.contains('dark') ? '#fff' : '#121212')}
      >
        {state.account ? `Connected: ${state.account}` : 'Connect to MetaMask'}
      </button>
      {state.error && <p style={{ color: 'red'}}>{state.error}</p>}
    </div>
  );
};

export default ConnectWalletButton;