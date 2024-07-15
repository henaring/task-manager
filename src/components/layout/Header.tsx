import { Calendar } from "../Calendar";
import "./Header.css";
import moment from "moment";

function Header() {
  return (
    <header>
      <div className="mt-10 py-5 space-y-5">
        <div>
          <p className="text-sm text-slate-400">
            {moment().format("DD, MMMM, YYYY")}
          </p>
          <h3 className="text-xl">Daily Task</h3>
        </div>
        <Calendar />
      </div>
    </header>
  );
}

export default Header;
