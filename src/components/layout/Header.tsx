import { Calendar } from "../Calendar";
import "./Header.css";
import moment from "moment";

function Header() {
  return (
    <header className="bg-primary">
      <div className="mt-10 px-3 py-5 space-y-5">
        <div>
          <p className="text-sm text-muted">
            {moment().format("DD, MMMM, YYYY")}
          </p>

          <h3 className="text-2xl font-bold text-white">Today's Tasks</h3>
        </div>
        <Calendar />
      </div>
    </header>
  );
}

export default Header;
