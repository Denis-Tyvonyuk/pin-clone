import { useState } from "react";
import "./userButton.css";
import Image from "../Image/image";

const UserButton = () => {
  const [open, setOpen] = useState(false);

  //Temp
  const currentUser = true;

  return currentUser ? (
    <div className="userButton">
      <Image path="/general/noAvatar.png" alt="" />
      <Image
        path="/general/arrow.svg"
        onClick={() => setOpen((prev) => !prev)}
        alt=""
        className="arrow"
      />
      {open && (
        <div className="userOptions">
          <div className="userOption">Profile</div>
          <div className="userOption">Settings</div>
          <div className="userOption">Logout</div>
        </div>
      )}
    </div>
  ) : (
    <a href="/" className="loginLink">
      Login / Sign Up
    </a>
  );
};

export default UserButton;
