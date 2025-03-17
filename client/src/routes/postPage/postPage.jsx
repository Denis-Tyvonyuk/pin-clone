import "./postPage.css";
import Image from "../../components/Image/image.jsx";
import PostInteraction from "../../components/postInteractions/postInteractions";
import { Link } from "react-router"; // Corrected import
import Comments from "../../components/comments/comments";

const PostPage = () => {
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

      {/* Post Content */}
      <div className="postContainer">
        <div className="postImg">
          <Image path="/pins/pin1.jpeg" alt="Post Image" w={736} />
          {/* Added alt text */}
        </div>

        {/* Post Details */}
        <div className="postDetails">
          <PostInteraction />
          <Link to="/john" className="postUser">
            <Image path="/general/noAvatar.png" alt="User Avatar" />{" "}
            {/* Added alt text */}
            <span>John Doe</span>
          </Link>
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
