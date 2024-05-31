import "./Posts.css";
import { useDispatch } from "react-redux";
import { resetPost } from "../post-slice";
import usePosts from "../hooks/usePosts";
import SearchPost from "./SearchPost";

const PostsList = () => {
  const { posts, post, isLoading, error } = usePosts();
  const dispatch = useDispatch();
  if (isLoading) return <p> Loading...</p>;
  return (
    <>
      <SearchPost />
      {error && <p>{error.message}</p>}
      {!error && (
        <div className='posts-list'>
          <h1>Latest Posts: ({posts?.length})</h1>
          {post.id ? (
            <div className='post-details' key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <button onClick={() => dispatch(resetPost())}>
                Back
              </button>
            </div>
          ) : (
            posts?.map((post) => (
              <div key={post.id} className='post-details'>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default PostsList;
