export interface TransactionProps {
  time: Date;
  amount: number;
  status: "Success" | "Failure" | "Processing";
  provider: string;
}

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: TransactionProps[];
}) => {
  if (!transactions?.length) {
    return <div className="space-y-2">No recent transactions</div>;
  }

  return (
    <>
      {transactions.map((transaction, index) => (
        <div className="space-y-0.5 py-2" key={index}>
          <div className="flex justify-between items-center">
            <span className="font-medium">Received INR</span>
            <span className="flex items-center gap-1">
              <ReceiveIcon className="w-4 h-4" />
              <span className="font-semibold"> ₹ {transaction.amount}</span>
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-sm">{transaction.time.toDateString()}</span>
            <span>{transaction.provider}</span>
          </div>
        </div>
      ))}
    </>
  );
};

function ReceiveIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
