import { NavLink } from "react-router-dom";
import clsx from "clsx";
import style from "./Navigation.module.css";

const Navigation = () => {
  const createIsActive = ({ isActive }) => {
    return clsx(style.addInfoLink, isActive && style.active);
  };
  return (
    <nav>
      <ul className={style.list}>
        <li>
          <NavLink to="/" className={createIsActive}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={createIsActive}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
