import "./profilePage.css";
import Image from "../../components/Image/image.jsx";
import { useState } from "react";
import Gallery from "../../components/gallery/gallery.jsx";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import apiRequest from "../../utils/apiRequest.js";
import Boards from "../../components/boards/boards.jsx";

const ProfilePage = () => {
  const [type, setType] = useState("saved");

  const { username } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";
  if (error) return "error:" + error.message;

  if (!data) return "user not found";

  return (
    <div className="profilePage">
      <Image
        className={"profileImg"}
        w={100}
        h={100}
        path={data.img || "/general/noAvatar.png"}
        alt={""}
      />
      <h1 className="profileName">{data.displayName}</h1>
      <span className="profileUsername">{data.username}</span>
      <div className="followCounts">10 followers : 20 followings</div>
      <div className="profileInteractions">
        <Image path={"/general/share.svg"} alt={""} />
        <div className="profileButtons">
          <button>Message</button>
          <button>Follow</button>
        </div>
        <Image path={"/general/more.svg"} alt={""} />
      </div>
      <div className="profileOptions">
        <span
          onClick={() => setType("created")}
          className={type === "created" ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={type === "saved" ? "active" : ""}
        >
          Save
        </span>
      </div>
      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};

export default ProfilePage;
