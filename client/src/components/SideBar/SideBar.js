import { useState } from 'react';
import MenuItem from './MenuItem';

export default function Menu({ activePage = 'home' }) {
  const [isAudit, setIsAudit] = useState(true);
  const [istrxt, setIsTrxt] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isLogOut, setIsLogout] = useState(false);
  const [isActive, setIsActive] = useState(false);
  // const [defaultItem, setDefaultItem] = useState(true)
  const setTxt = () => {
    setIsTrxt(true);
    setIsAudit(false);
    setIsSetting(false);
    setIsLogout(false);
  };

  const setAudit = () => {
    setIsTrxt(false);
    setIsAudit(true);
    setIsSetting(false);
    setIsLogout(false);
  };

  const setSettings = () => {
    setIsTrxt(false);
    setIsAudit(false);
    setIsSetting(true);
    setIsLogout(false);
  };

  const setLogout = () => {
    setIsTrxt(false);
    setIsAudit(false);
    setIsSetting(false);
    setIsLogout(true);
  };

  return (
    <div className="menu">
      <div className="menu-header">
        <img width={60} height={70} className="menu-logo" src="/assets/images/logo.png" alt="" />
      </div>
      <div className="menu-items-container">
        <MenuItem
          svgIcon="dyalog.svg"
          name="Audit Logs"
          path="/audit"
          isActive={isAudit}
          triggerMenu={setAudit}
        />

        <MenuItem
          svgIcon="dashboard.svg"
          name="Receipts"
          path="/receipts"
          isActive={istrxt}
          triggerMenu={setTxt}
        />

        <MenuItem
          svgIcon="settings.svg"
          name="Settings"
          path="/settings"
          isActive={isSetting}
          triggerMenu={setSettings}
        />
        <MenuItem
          svgIcon="logout.svg"
          name="Logout"
          path="/"
          isActive={isLogOut}
          triggerMenu={setLogout}
        />
      </div>
    </div>
  );
}
