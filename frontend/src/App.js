import React from "react";
import logo from "./logo.svg";
import "./App.css";

import initWeb3 from "./utils/web3";
import contractArtifact from "./contracts/TokenFactory";
import { toWei, fromWei } from "web3-utils";
import getContract from "./utils/contract";

async function getAccounts(web3) {
  const accounts = await web3.eth.getAccounts();
  console.log("getAccounts", accounts[0]);

  return accounts;
}

class App extends React.Component {
  async componentDidMount() {
    this.init();
  }

  init = async () => {
    this.web3 = await initWeb3();

    try {
      // check network and retrieve deployed contract
      this.contract = await getContract(contractArtifact, this.web3);

      // set the initial accounts
      this.accounts = await getAccounts(this.web3);

      console.log("Dapp initialised");
    } catch (err) {
      console.error("Failed to init Dapp");
      console.error(err);
    }

    // set up listeners for app interactions.
    // TODO

    // trigger various things that need to happen upon app being opened.
    // TODO
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
