import "./postPage.css";
import Image from "../../components/Image/image.jsx";
import PostInteraction from "../../components/postInteractions/postInteractions";
import { Link, useParams } from "react-router"; // Corrected import
import Comments from "../../components/comments/comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiRequest from "../../utils/apiRequest.js";

const PostPage = () => {
  const { id } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => apiRequest.get(`/pins/${id}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";
  if (error) return "error:" + error.message;

  if (!data) return "Pin not found";

  return (
    <div className="postPage">
      {/* Back Button */}
      <svg
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
        onClick={() => window.history.back()} // Add functionality to go back
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>

      <div className="postContainer">
        <div className="postImg">
          <Image path={data.media} alt="Post Image" w={736} />
        </div>

        <div className="postDetails">
          <PostInteraction postId={id} />
          <Link to={`/profile/${data.user.username}`} className="postUser">
            <Image
              parh={data.user.img || "/general/noAvatar.png"}
              alt="User Avatar"
            />{" "}
            <span>{data.user.displayName}</span>
          </Link>
          <Comments id={data._id} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
