import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";

export const Social = () => {
  return (
    <div className="flex itmes-center w-full gap-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaGoogle />
      </Button>

      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaGithub />
      </Button>
    </div>
  );
};
