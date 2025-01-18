import React, { useState } from 'react';

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
        setState({ account: null, error: 'Error connecting to MetaMask' });
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
        backgroundColor: '#121212', 
        color: '#fff', 
        border: 'none', 
        borderRadius: '5px',
        transition: 'background-color 0.3s ease'
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
      >
      {state.account ? `Connected: ${state.account}` : 'Connect to MetaMask'}
      </button>
      {state.error && <p style={{ color: 'red'}}>{state.error}</p>}
    </div>
  );
};

export default ConnectWalletButton;