import React from 'react';
import Topbar from './Topbar';

/**
 * RecordsTopbar
 *
 * Thin wrapper around the shared Topbar, kept for backwards compatibility
 * with existing imports. Guarantees the Records page uses the exact same
 * icons and dark-mode behavior as every other patient page.
 */
export const RecordsTopbar = ({
  darkMode = false,
  setDarkMode = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
}) => {
  return (
    <Topbar
      title="Records"
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      onProfileClick={onProfileClick}
      onSettingsClick={onSettingsClick}
    />
  );
};

export default RecordsTopbar;
