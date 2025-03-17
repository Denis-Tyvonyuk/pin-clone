import "./postInteractions.css";
import Image from "../Image/image.jsx";

const PostInteraction = () => {
  return (
    <div className="postInteractions">
      <div className="interactions">
        <Image path="/general/react.svg" />
        213
        <Image path="/general/share.svg" />
        <Image path="/general/more.svg" />
      </div>
      <button>Save</button>
    </div>
  );
};

export default PostInteraction;
