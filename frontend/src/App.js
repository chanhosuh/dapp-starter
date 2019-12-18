import React from "react";
import logo from "./logo.svg";
import "./App.css";

import initWeb3 from "./utils/web3";
import contractArtifact from "./contracts/SampleContract";
import { toWei, fromWei, toBN } from "web3-utils";
import getContract from "./utils/contract";

async function getAccounts(web3) {
  const accounts = await web3.eth.getAccounts();
  console.log("getAccounts", accounts[0]);

  return accounts;
}

class App extends React.Component {
  state = {
    accounts: [],
    contract: null
  };

  async componentDidMount() {
    this.web3 = await initWeb3();

    if (this.web3) {
      // initialize DApp with accounts and contracts info
      this.init();

      // add listeners for account and network changes
      const web3Provider = this.web3.currentProvider;
      web3Provider.on("accountsChanged", async accounts => {
        console.log("Account(s) updated.");
        console.log("accounts[0]: ", accounts[0]);
        this.init();
      });

      web3Provider.on("networkChanged", async netId => {
        console.log("Network changed.");
        console.log("Net ID: ", netId);
        this.init();
      });
    }
  }

  init = async () => {
    try {
      // check network and retrieve deployed contract
      const contract = await getContract(contractArtifact, this.web3);
      console.debug("Contract(s) initialized.");

      // set the initial accounts
      const accounts = await getAccounts(this.web3);
      console.debug("Account(s) retrieved.");

      this.setState({ accounts, contract });

      // set up listeners for app interactions.

      // trigger various things that need to happen upon app being opened.

      console.log("Dapp initialised");
    } catch (err) {
      console.error("Failed to init Dapp");
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
