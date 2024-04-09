export interface DirectTransferProps {
  time: Date;
  amount: number;
  status: string;
  name: string;
}

export const DirectTransfers = ({
  transfers,
}: {
  transfers: DirectTransferProps[];
}) => {
  if (!transfers?.length) {
    return <div className="space-y-2">No recent transfers</div>;
  }

  return (
    <>
      {transfers.map((transaction, index) => (
        <div className="space-y-0.5 py-2" key={index}>
          <div className="flex justify-between items-center">
            <span className="font-medium">{transaction.status} INR</span>
            <span className="font-semibold flex items-center gap-1">
              {transaction.status === "Sent" ? (
                <SentIcon className="w-4 h-4 text-red-500" />
              ) : (
                <ReceiveIcon className="w-4 h-4 text-green-500" />
              )}{" "}
              Rs {transaction.amount}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-500">
            <span className="text-sm">{transaction.time.toDateString()}</span>
            <span>{transaction.name}</span>
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
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
      />
    </svg>
  );
}

function SentIcon(props: { className: string }) {
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
        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
