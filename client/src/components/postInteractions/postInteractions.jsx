import "./postInteractions.css";
import Image from "../Image/image.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest.js";
import { useState } from "react";

const interact = async (id, type) => {
  // Fixed parameter name from IdleDeadline to id
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });
  return res.data;
};

const PostInteraction = ({ postId }) => {
  const queryClient = useQueryClient();
  const [localLikeCount, setLocalLikeCount] = useState(0); // For optimistic updates
  const [isAnimating, setIsAnimating] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["interactionCheck", postId],
    queryFn: async () => {
      const res = await apiRequest.get(`/pins/interaction-check/${postId}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({ id, type }) => interact(id, type),
    onMutate: async ({ type }) => {
      // Optimistic updates
      await queryClient.cancelQueries({
        queryKey: ["interactionCheck", postId],
      });
      const previousData = queryClient.getQueryData([
        "interactionCheck",
        postId,
      ]);

      if (type === "like") {
        queryClient.setQueryData(["interactionCheck", postId], (old) => ({
          ...old,
          isLiked: !old.isLiked,
          likeCount: old.isLiked ? old.likeCount - 1 : old.likeCount + 1,
        }));
        setLocalLikeCount((prev) => (old.isLiked ? prev - 1 : prev + 1));
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      } else if (type === "save") {
        queryClient.setQueryData(["interactionCheck", postId], (old) => ({
          ...old,
          isSaved: !old.isSaved,
        }));
      }

      return { previousData };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ["interactionCheck", postId],
        context.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["interactionCheck", postId] });
    },
  });

  if (isLoading)
    return <div className="postInteractions loading">Loading...</div>;
  if (error)
    return (
      <div className="postInteractions error">Error loading interactions</div>
    );

  const handleLike = () => {
    mutation.mutate({ id: postId, type: "like" });
  };

  const handleSave = () => {
    mutation.mutate({ id: postId, type: "save" });
  };

  return (
    <div className="postInteractions">
      <div className="interactions">
        <button
          className={`like-button ${isAnimating ? "animate" : ""}`}
          onClick={handleLike}
          aria-label={data?.isLiked ? "Unlike" : "Like"}
          disabled={mutation.isPending}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke={data?.isLiked ? "#e50829" : "#000000"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={data?.isLiked ? "#e50829" : "none"}
            />
          </svg>
          <span>{data?.likeCount || 0}</span>
        </button>

        <button className="share-button" aria-label="Share">
          <Image path="/general/share.svg" alt="Share" />
        </button>

        <button className="more-button" aria-label="More options">
          <Image path="/general/more.svg" alt="More options" />
        </button>
      </div>

      <button
        className={`save-button ${data?.isSaved ? "saved" : ""}`}
        onClick={handleSave}
        disabled={mutation.isPending}
        aria-label={data?.isSaved ? "Unsave" : "Save"}
      >
        {data?.isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default PostInteraction;
