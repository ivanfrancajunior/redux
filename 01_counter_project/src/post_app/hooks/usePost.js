import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost } from "../post-slice";

const usePost = (id) => {
  const dispatch = useDispatch();

  dispatch(fetchSinglePost(id));

  const { isLoading, error, post } = useSelector(
    (store) => store.posts
  );

  return {
    post,
    isLoading,
    error,
  };
};

export default usePost;
