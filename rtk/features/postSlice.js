const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  fetch  = require("node-fetch");

const fetchPost = createAsyncThunk("post/fetchPost", async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = await response.json();
  return post;
});

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    loading: false,
    error: null,
  },
  reducers: {
    loadPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

module.exports = postSlice.reducer;
module.exports.fetchPost = fetchPost;
