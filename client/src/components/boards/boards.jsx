import "./boards.css";
import Image from "../Image/image";
import apiRequest from "../../utils/apiRequest";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Link } from "react-router";

const Boards = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading...";
  if (error) return "error:" + error.message;

  if (!data) return "user not found";

  console.log(data);
  return (
    <div className="collections">
      {/* {Collection} */}
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          className="collection"
          key={board._id}
        >
          <Image src={board.firstPin.media} alt={""} />
          <div className="collectionInfo">
            <h1>{board.title}</h1>
            <span>
              {board.pinCount} pins : {format(board.createAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
