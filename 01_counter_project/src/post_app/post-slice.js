import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  post: {},
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPost: (state) => {
      state.post = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSinglePost.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.post = action.payload;
        }
      )
      .addCase(
        fetchSinglePost.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const fetchPosts = createAsyncThunk(
  "posts/fetchPostsRequest",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await response.json();
    return data;
  }
);

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePostRequest",
  async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = await response.json();
    return data;
  }
);

export default postSlice.reducer;
export const { resetPost } = postSlice.actions;
