import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPaperPlane } from "react-icons/fa";

import Wrapper from "../assets/wrappers/ApplyFollowButton";

export default function ApplyFollowButton({ jobId, isFollowing }) {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    try {
      await axios.post(`/api/v1/users/follow/${jobId}`);
      setFollowing(true);
      toast.success("Following the job....");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.error("Error following job", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(`/api/v1/users/unfollow/${jobId}`);
      setFollowing(false);
      toast.success("Unfollowing the job....");
    } catch (error) {
      console.error("Error unfollowing job", error);
    }
  };

  const handleApply = async () => {
    try {
      await axios.post(`/api/v1/applications/apply/${jobId}`);
      toast.success("You have applied to this job....");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.error("Error applying job", error);
    }
  };

  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing, jobId]);

  return (
    <Wrapper>
      <button className="apply" onClick={handleApply}>
        <FaPaperPlane className="icon" />
        Apply
      </button>
      <button
        onClick={following ? handleUnfollow : handleFollow}
        className="follow"
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </Wrapper>
  );
}
