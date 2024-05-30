import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../post-slice";

const usePosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const { posts, isLoading, error, post } = useSelector(
    (store) => store.posts
  );

  return {
    post,
    posts,
    isLoading,
    error,
  };
};

export default usePosts;
