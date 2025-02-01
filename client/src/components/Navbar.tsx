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
    <div>
      <div className="fascinate-inline-regular logo text-3xl text-bold ">
        Greenlight
      </div>
    </div>
  );

  const actionsComponent = (
    <>
      {/* persistent banner */}

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
      <nav
        id="navbarContainer"
        className="flex justify-between p-2 px-6 bg-gray-200 shadow-md items-center justify-center text-center"
      >
        {logo}
        {/* action holder */}
        {actionsComponent}
      </nav>
      <div id="persistentBanner">
        <div className="bg-green-100 dark:bg-green-900 p-4 text-center">
          New! **Conscious Cart Mode** is here. Shop Sustainably
        </div>
      </div>
    </>
  );
};

export default Navbar;
