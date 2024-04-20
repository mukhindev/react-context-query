import { useEffect } from "react";
import { PostContextQuery } from "./PostContextQuery";

interface PostProps {
  postId: number;
}

export default function Post(props: PostProps) {
  const { postId } = props;

  const { reply, inPending, inProgress, fetch } = PostContextQuery.useQuery();

  useEffect(() => {
    fetch({
      postId,
      params: {
        search: "test",
      },
    });
  }, [postId]);

  return (
    <div>
      <div>ID: {postId}</div>
      <div>inPending: {inPending ? "true" : "false"}</div>
      <div>inProgress: {inProgress ? "true" : "false"}</div>
      {inPending && "Loading..."}
      <pre>{JSON.stringify(reply?.data, null, 2)}</pre>
    </div>
  );
}
