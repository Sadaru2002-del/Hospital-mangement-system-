import React from "react";
import Topbar from "./Topbar";

/**
 * Navbar
 *
 * Thin wrapper around the shared Topbar so the patient dashboard chrome
 * (search, dark-mode toggle, profile, settings) always matches every
 * other patient page (Payments, Records, Prescriptions).
 */
const Navbar = ({
  title = "Dashboard",
  darkMode = false,
  setDarkMode = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
}) => {
  return (
    <Topbar
      title={title}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      onProfileClick={onProfileClick}
      onSettingsClick={onSettingsClick}
    />
  );
};

export default Navbar;
