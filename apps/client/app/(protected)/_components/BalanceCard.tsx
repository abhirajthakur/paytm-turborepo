"use client";

export interface BalanceProps {
  amount: number;
  locked: number;
}

export const BalanceCard = ({ amount, locked }: BalanceProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Unlocked balance</span>
        <span>₹ {amount}</span>
      </div>
      <div className="flex justify-between">
        <span>Locked Balance</span>
        <span>₹ {locked}</span>
      </div>
      <div className="flex justify-between">
        <span>Total Balance</span>
        <span>₹ {locked + amount}</span>
      </div>
    </div>
  );
};
