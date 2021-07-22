import React from 'react';
import { Col } from 'react-bootstrap';
import { useState } from 'react';

const series = [
  { name: 'John', data: [3] },
  { name: 'John', data: [11] },
  { name: 'John', data: [19] },
  { name: 'John', data: [3] },
  { name: 'John', data: [11] },
  { name: 'John', data: [19] },
];

export default function SettingsPage() {
  var [itemState, selectItem] = useState({ itemProfileSelected: true, itemProfileSelected: false });

  return (
    <Col>
      <div className="settings-container">
        <div className="settings-left">
          <div className="settings-title-wrapper">
            <div className="settings-title">
              <div
                className="settings-title-item"
                onClick={() => selectItem({ itemProfileSelected: true, isAccountSelected: false })}
              >
                PROFILE SETTNGS
              </div>
              <div
                className="settings-title-item"
                onClick={() => selectItem({ itemProfileSelected: false, isAccountSelected: true })}
              >
                ACCOUNT SETTINGS
              </div>
            </div>
            <div
              className={`selected-settings-indicator-wrapper ${
                itemState.isAccountSelected ? 'dismiss' : 'selected'
              }`}
            >
              <div className="selected-settings-indicator"></div>
            </div>
          </div>
          {!itemState.isAccountSelected && <ProfileSettings />}
          {itemState.isAccountSelected && <AccountSettings />}
        </div>
        <div className="settings-right">
          <img
            width={'100%'}
            height={'100%'}
            className="mr-3"
            src="./assets/images/image2.jpg"
            alt=""
          />
        </div>
      </div>
    </Col>
  );
}

function ProfileSettings() {
  return (
    <div className="profile-settings-container">
      <div>
        <img width={50} height={50} className="mr-3" src="./assets/svg/user.svg" alt="" />
      </div>
      <div className="profie-info-container">
        <div className="user-name">AFEEZ YUSUF</div>
        <div className="user-title">System Administrator</div>
      </div>
      <div className="profie-info-wrapper ">
        <div className="user-info-title">ADDRESS:</div>
        <div className="user-info-content">Ocean center, gudu</div>
      </div>
      <div className="profie-info-wrapper ">
        <div className="user-info-title">DATE LOGGED:</div>
        <div className="user-info-content">21/7/2021</div>
      </div>
      <div className="profie-info-wrapper ">
        <div className="user-info-title">LAST LOGGED:</div>
        <div className="user-info-content"> 10:32:50 ago</div>
      </div>
    </div>
  );
}

function AccountSettings() {
  return (
    <div className="account-settings-container">
      <AccountSettingsTile icon="fingerprint.svg" content="PRIVACY SETTING" />
      <AccountSettingsTile icon="lock.svg" content="SECURITY SETTINGS" />
      <AccountSettingsTile icon="notifications.svg" content="NOTIFICATION SETTINGS" />
    </div>
  );
}

function AccountSettingsTile({ icon, content }) {
  return (
    <div className="account-info-wrapper ">
      <div className="account-icon">
        <img width={20} height={20} className="mr-3" src={'./assets/svg/' + icon} alt="" />
      </div>
      <div className="account-title">{content}</div>
    </div>
  );
}
