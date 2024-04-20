import Post, { PostContextQuery } from "../entities/post/components/Post";
import { useState } from "react";

export default function App() {
  const [isThirdPostShow, setIsThirdPostShow] = useState(false);

  return (
    <main>
      <PostContextQuery.Provider>
        <Post postId={1} />
      </PostContextQuery.Provider>
      <hr />
      <PostContextQuery.Provider>
        <Post postId={2} />
      </PostContextQuery.Provider>
      <hr />
      <p>
        Open ID 3. Then close and open again. PostContextQuery already has data
      </p>
      <PostContextQuery.Provider>
        <button onClick={() => setIsThirdPostShow((prev) => !prev)}>
          Open ID 3
        </button>
        {isThirdPostShow && <Post postId={3} />}
      </PostContextQuery.Provider>
    </main>
  );
}
