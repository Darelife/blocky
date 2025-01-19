import NumSubs from "./NumSubs";
import AddButton from "./AddButton";

export default function Left() {
  return (
    <div className="left-container" style={{margin:"auto"}}>
      <AddButton />
      <div className="mb-7"></div>
      <NumSubs initialCount={4} />
    </div>
  );
}