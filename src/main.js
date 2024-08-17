import React, { useState, useEffect } from "react";
import { ButtonBase } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormHeader from "./FormHeader";
import StakeButton from "./StakingButton";
import Navbar from "./Navbar";

const REWARD_RATE = 0.004566210045662;

const StakeForm = ({ amount, setAmount, tokenBalance, handleSubmit, buttonText, disabled = false, loading }) => (
  <form onSubmit={handleSubmit}>
    <div className="w-full mt-[8px]">
      <p className="text-right">Max: {tokenBalance}</p>
      <section className="flex justify-end">
        <div className="flex items-center border border-black flex-[2] px-4 mr-[8px]">
          <input
            type="number"
            name="stake"
            id="stake"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-right no-arrows outline-none focus:outline-none border-none text-[24px] font-bold"
          />
          <p className="ml-5 text-[24px] font-[100] tracking-[0.22512px] leading-[1.5]">
            BASE
          </p>
        </div>
        <ButtonBase
          className="MuiTouchRipple-root"
          onClick={() => setAmount(tokenBalance)}
          style={{
            backgroundColor: "#77787D",
            padding: "20px",
            paddingLeft: "24px",
            paddingRight: "24px",
            fontSize: "14px",
            color: "white",
            borderRadius: "5px",
            textTransform: "uppercase",
            fontWeight: 400,
            letterSpacing: "0.02857em",
            lineHeight: "1.75",
          }}
        >
          Max
        </ButtonBase>
      </section>
      <StakeButton type="submit" buttonText={buttonText} disabled={disabled} Loading={loading} />
    </div>
  </form>
);

const Main = () => {
  const [amount, setAmount] = useState(0);
  const [unstakeAmount, setUnstakeAmount] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(100); // Placeholder value
  const [unStakedStatus, setUnStakedStatus] = useState(null);
  const [stakeReward, setStakeReward] = useState(0);
  const [stakeLoading, setStakeLoading] = useState(false);
  const [unstakeLoading, setUnStakeLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(updateRewardPeriodically, 3600000); // 1 hour
    return () => clearInterval(intervalId);
  }, []);

  const calculateUpdatedReward = (currentReward) => {
    return currentReward * (1 + REWARD_RATE);
  };

  const updateRewardPeriodically = () => {
    setStakeReward((prevReward) => calculateUpdatedReward(prevReward));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStakeLoading(true);
    
    // Simulating a staking process
    setTimeout(() => {
      toast.success("Token staked successfully");
      setTokenBalance(prevBalance => prevBalance - parseFloat(amount));
      setAmount(0);
      setStakeLoading(false);
    }, 2000);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Navbar />
      <div className="mt-[70px]">
        <article className="pb-[24px] my-[60px] mb-[80px] md:mb-[100px]">
          <h2 className="text-[50px] leading-[56px] font-[400]">
            SINGLE STAKE POOL
          </h2>
          <p className="text-[20px] font-[700] leading-[32px]">
            Staked $BASE is locked until maturity.
          </p>
        </article>
        <main className="bg-white text-black rounded-[25px] w-full md:w-[450px] mx-auto p-[16px] pb-0">
          <div className="mb-[24px]">
            <FormHeader leading="APY" value="1200%" />
            <FormHeader leading="Lock Time" value="1 month" />
            <FormHeader leading="Wallet" value={`${tokenBalance} BASE`} />
          </div>
          <StakeForm
            amount={amount}
            setAmount={setAmount}
            tokenBalance={tokenBalance}
            handleSubmit={handleSubmit}
            buttonText="Stake"
            loading={stakeLoading}
          />
          <p className="text-[14px]">{transactionStatus}</p>
          <StakeForm
            amount={unstakeAmount}
            setAmount={setUnstakeAmount}
            tokenBalance={tokenBalance}
            handleSubmit={(e) => {
              e.preventDefault();
              setUnStakedStatus("UnStaked token can only be unstaked after a period of 30 days");
            }}
            buttonText="UnStake"
            disabled={true}
          />
          <p className="text-[14px] transition-opacity duration-200 ease-linear">
            {unStakedStatus}
          </p>
          <article>
            <hr />
            <section className="flex justify-between items-center mt-[24px]">
              <h3 className="text-[16px] font-[700]">Your Rewards</h3>
              <h3 className="text-[24px] font-[700]">{stakeReward} BASE</h3>
            </section>
            <StakeButton
              buttonText="CLAIM REWARDS"
              onClick={() => null}
              disabled={true}
              paddingBottom={"20px"}
            />
          </article>
        </main>
      </div>
    </>
  );
};

export default Main;