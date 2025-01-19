import MonthlyCost from "./MonthlyCost";
import NumSubs from "./NumSubs";
import Subscriptions from "./Subscriptions";

export default function DashBoard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <NumSubs initialCount={4} />
      <Subscriptions />
      <MonthlyCost cost={100} />
    </div>
  );
}