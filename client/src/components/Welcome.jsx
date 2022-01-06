import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiE, SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { useTransactions } from "../context/TransactionContext";
import { Loader } from "./";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, value, name, type, handleChange }) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      name={name}
      type={type}
      min={0}
      step={"0.0001"}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-sm white-glassmorphism text-white border-none"
    />
  );
};

const Welcome = () => {
  const {
    connectWallet,
    connectedAccount,
    handleChange,
    formData,
    setFormData,
    sendTransaction,
    isLoading,
  } = useTransactions();

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl py-1 text-white text-gradient">
            Send Crypto
            <br /> across the world
          </h1>
          <p className="mt-2 text-left text-white sm:text-2xl font-light text-base md:w-9/12 w-11/12">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypto
          </p>
          {!connectedAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row items-center justify-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-bold">Connect Wallet</p>
            </button>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 w-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={`rounded-tr-2xl sm:rounded-none ${commonStyles}`}>
              Security
            </div>
            <div className={`rounded-none sm:rounded-tr-2xl ${commonStyles}`}>
              Ethereumn
            </div>
            <div className={`rounded-none sm:rounded-bl-2xl ${commonStyles}`}>
              Web 3.0
            </div>
            <div className={`sm:rounded-none rounded-bl-2xl ${commonStyles}`}>
              Less fees
            </div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="justify-between flex flex-col w-full h-full ">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white justify-center flex items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div className="">
                <p className="text-white font-light text-sm">Address</p>
                <p className="text-white font-semibold mt-1 text-lg">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder={"Address To"}
              name="addressTo"
              type="text"
              value={formData.addressTo}
              handleChange={handleChange}
            />
            <Input
              placeholder={"Amount (ETH)"}
              name="amount"
              value={formData.amount}
              type="number"
              handleChange={handleChange}
            />
            <Input
              placeholder={"Keyword (Gif)"}
              value={formData.keyword}
              name="keyword"
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder={"Enter Message"}
              name="message"
              value={formData.message}
              type="text"
              handleChange={handleChange}
            />
            <div className="h-[1px] my-2 w-full bg-gray-400" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
                onClick={handleSubmit}
              >
                Send Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
