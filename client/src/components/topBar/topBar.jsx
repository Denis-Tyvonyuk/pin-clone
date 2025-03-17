import Image from "../Image/image";
import UserButton from "../userButton/userButton";
import "./topBar.css";

const TopBar = () => {
  return (
    <div className="topBar">
      {/*Search */}
      <div className="search">
        <Image path="/general/search.svg" alt="" />
        <input type="text" placeholder="Search" />
      </div>
      {/*User */}
      <UserButton />
    </div>
  );
};

export default TopBar;
