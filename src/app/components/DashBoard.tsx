import Left from "./Left";
import MonthlyCost from "./MonthlyCost";
import Subscriptions from "./Subscriptions";

export default function DashBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* <NumSubs initialCount={4} /> */}
      <Left />
      <Subscriptions />
      <MonthlyCost />
    </div>
  );
}
