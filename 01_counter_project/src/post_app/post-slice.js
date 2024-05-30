const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  post: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "posts/fetchPostsRequest":
      return {
        ...state,
        isLoading: true,
      };
    case "posts/sucessPostsRequest":
      return {
        ...state,
        isLoading: false,
        error: null,
        posts: action.payload,
      };

    case "posts/errorPostRequest":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        posts: [],
      };

    case "posts/fetchSinglePostRequest":
      return {
        ...state,
        isLoading: true,
      };

    case "posts/sucessSinglePostRequest":
      return {
        ...state,
        isLoading: false,
        error: null,
        post: action.payload,
      };

    case "posts/errorSinglePostRequest":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        post: {},
      };

    case "posts/resetPost": {
      return {
        ...state,
        post: {},
      };
    }
    default:
      return state;
  }
};
export function fetchPostsRequest() {
  return { type: "posts/fetchPostsRequest" };
}
export function sucessPostsRequest(posts) {
  return {
    type: "posts/sucessPostsRequest",
    payload: posts,
  };
}
export function errorPostsRequest(error) {
  return {
    type: "posts/errorPostsRequest",
    payload: error,
  };
}
export function fetchPosts() {
  return async function (dispatch) {
    dispatch(fetchPostsRequest());
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await res.json();
      dispatch(sucessPostsRequest(data));
    } catch (error) {
      dispatch(errorPostsRequest(error));
    }
  };
}
export function fetchSinglePostRequest() {
  return { type: "posts/fetchSinglePostRequest" };
}
export function sucessSinglePostRequest(post) {
  return {
    type: "posts/sucessSinglePostRequest",
    payload: post,
  };
}
export function errorSinglePostRequest(error) {
  return {
    type: "posts/errorSinglePostRequest",
    payload: error,
  };
}
export function fetchSinglePost(id) {
  return async function (dispatch) {
    dispatch(fetchSinglePostRequest());
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await res.json();
      dispatch(sucessSinglePostRequest(data));
    } catch (error) {
      dispatch(errorSinglePostRequest(error));
    }
  };
}
export function resetPost() {
  return { type: "posts/resetPost" };
}
export default postReducer;
