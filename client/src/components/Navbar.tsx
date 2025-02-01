import react, { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";

/** components */
import DarkModeToggle from "./DarkModeToggle";

/** styles */
import "../styles/navbar.css";
// import "@/styles/navbar.css";

/** we need to be able to toggle dark mode from the navbar */
const Navbar = () => {
  const darkModeContext = useContext(DarkModeContext);
  // whats the point of this code?
  if (!darkModeContext) {
    return null;
  }

  return (
    <>
      {/* navbar container */}
      <nav
        id="navbarContainer"
        className="flex justify-between p-4 bg-gray-200 shadow-md items-center justify-center text-center"
      >
        {/* logo holder */}
        <div>
          <h1 className="text-green-600 text-3xl text-bold bg-red-100">
            Greenlight
          </h1>
        </div>

        {/* action holder */}
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
      </nav>
    </>
  );
};

export default Navbar;
