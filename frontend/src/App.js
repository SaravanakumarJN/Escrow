import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import './App.css';
import { ABI, CONTRACT_ADDRESS } from './envVars';

function App() {
  const [web3Provider, setWeb3Provider] = useState(null);
  const [contract, setContract] = useState(null);
  const [amount, setAmount] = useState(0);

  const handleInitiateWeb3Provider = async () => {
    // detect the metamask extension and get the provider
    const metamaskProvider = await detectEthereumProvider();

    if (metamaskProvider) {
      // connect the metamask with web3 provider
      const web3Provider = new ethers.providers.Web3Provider(metamaskProvider);
      setWeb3Provider(web3Provider);
    } else {
      window.alert('Please Install Metamask');
    }
  };

  const handleConnectContract = async () => {
    if (web3Provider) {
      // ask permission to connect the metamask to page
      await web3Provider.send('eth_requestAccounts', []);
      const signer = await web3Provider.getSigner();

      // get the contract with signer permission
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      if (contract) {
        setContract(contract);

        let amount = await contract.amount();
        amount = amount.toNumber();
        setAmount(amount);
      }
    }
  };

  const hanldeDepositFunds = () => {
    if (contract) {
      contract
        .deposit({ value: amount })
        .then((res) => {
          console.log(res);
          window.alert('Deposit funds successful')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSubmitWork = () => {
    if (contract) {
      contract
        .submitWork()
        .then((res) => {
          console.log(res);
          window.alert('Submit work successful')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleReleaseFunds = () => {
    if (contract) {
      contract
        .releaseFunds()
        .then((res) => {
          console.log(res);
          window.alert('Release funds successful')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    handleInitiateWeb3Provider();
  }, []);

  return (
    <div className='App'>
      <div className='header'>Escrow contract</div>
      {contract ? (
        <div className='container'>
          <table>
            <tbody>
              <tr>
                <td>Contract address</td>
                <td>{contract.address}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>{amount}</td>
              </tr>
            </tbody>
          </table>
          <div className='button-container'>
            <button className='button' onClick={hanldeDepositFunds}>
              Deposit funds
            </button>
            <button className='button' onClick={handleSubmitWork}>
              Submit work
            </button>
            <button className='button' onClick={handleReleaseFunds}>
              Release funds
            </button>
          </div>
        </div>
      ) : (
        <div className='container'>
          <button className='button' onClick={handleConnectContract}>
            Connect to Metamask
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
