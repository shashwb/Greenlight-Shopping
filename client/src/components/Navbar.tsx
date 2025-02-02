import { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";

/** components */
import DarkModeToggle from "./DarkModeToggle";

/** styles */
import "../styles/navbar.css";

/** we need to be able to toggle dark mode from the navbar */
const Navbar = () => {
  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) return null;

  const logo = (
    <div className="cool-font logo text-3xl text-bold ">GREENLIGHT</div>
  );

  const actionsComponent = (
    <>
      <div className="flex gap-4">
        {/* toggle dark mode */}
        <div className="flex items-center">
          <DarkModeToggle handleToggle={darkModeContext.toggleDarkMode} />
        </div>

        <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
        {/* the cart
      -> relative to the containign div which is within the 'action holder' flex, we create an absolute outside of normal dom flow */}
        <div className="relative">
          <span className="absolute flex items-center justify-center w-8 h-8 top-0 right-0 bg-green-400 text-gray-700 rounded-full">
            <div id="cartCountBadeNumber">3</div>
          </span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <nav id="navbarContainer" className="bg-gray-50">
        <div className="flex justify-between p-2 px-6 mx-8 items-center justify-center text-center">
          {logo}
          {actionsComponent}
        </div>
      </nav>
      {/* persistent banner */}
      <div id="persistentBanner">
        <div className="alt-main-font text-lg bg-green-200 dark:bg-green-900 p-4 text-center">
          <span className="underline text-xl font-bold text-green-900 dark:text-green-100">
            New!
          </span>
          {"  "}
          <b>"Conscious Cart Mode" </b>
          is here. Shop Sustainably
        </div>
      </div>
    </>
  );
};

export default Navbar;
