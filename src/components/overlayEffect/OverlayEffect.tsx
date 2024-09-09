/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type TProps = {
  setShowOverlay: any;
};
const OverlayEffect = ({ setShowOverlay }: TProps) => {
  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };
  return (
    <div
      onClick={handleCloseOverlay}
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/40 cursor-pointer"
    >
      <div className="rounded-lg bg-background p-8 shadow-lg">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">You have to login first</h2>
          <Link to={"/login"}>
            <Button>Go to login page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OverlayEffect;
