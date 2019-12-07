import Web3 from 'web3';

const initWeb3 = async () => {
  let web3;

  if (window.ethereum) {
    // modern Dapp browser or using Metamask
    web3 = new Web3(window.ethereum);
    try {
      // get permission to access accounts
      await window.ethereum.enable(); 
    } catch (err) {
      console.error('User denied account access.');
    }
  } else if (window.web3) {
    // legacy-style
    web3 = new Web3(window.web3.currentProvider);
  } else {
    console.error('No compatible web3 provider injected');
  }

  console.log('Web3 version', web3.version);
  return web3;
};

export default initWeb3;