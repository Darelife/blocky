import React, { useState } from 'react';

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
        console.error(err);
      }
    } else {
      setState({ account: null, error: 'MetaMask is not installed' });
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {state.account ? `Connected: ${state.account}` : 'Connect to MetaMask'}
      </button>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </div>
  );
};

export default ConnectWalletButton;