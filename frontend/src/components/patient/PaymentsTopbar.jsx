import React from 'react';
import Topbar from './Topbar';

/**
 * PaymentsTopbar
 *
 * Thin wrapper around the shared Topbar, kept for backwards compatibility
 * with existing imports. Guarantees the Payments page uses the exact same
 * icons and dark-mode behavior as every other patient page.
 */
export const PaymentsTopbar = ({
  darkMode = false,
  setDarkMode = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
}) => {
  return (
    <Topbar
      title="Payments"
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      onProfileClick={onProfileClick}
      onSettingsClick={onSettingsClick}
    />
  );
};

export default PaymentsTopbar;
