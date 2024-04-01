import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerText="Oops! Something went wrong!"
      footerText="Back to login"
      footerHref="/auth/signin"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive w-9 h-9" />
      </div>
    </CardWrapper>
  );
};
