import React, { useState, useEffect, createContext, useContext } from "react";

import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner(contractAddress);
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount") || 0
  );
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) alert("Please install metamask");

      const transactionContract = getEthereumContract();
      const { addressTo, amount, keyword, message } = formData;
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);

      await transactionHash.wait();
      setIsLoading(false);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

      setFormData({ addressTo: "", amount: "", keyword: "", message: "" });
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet: connectWallet,
        connectedAccount: connectedAccount,
        handleChange: handleChange,
        formData: formData,
        setFormData: setFormData,
        sendTransaction: sendTransaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionContext);
