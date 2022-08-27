const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  fetch  = require("node-fetch");

const fetchRelatedPosts = createAsyncThunk(
  "relatedPost/fetchRelatedPosts",
  async (url) => {
    const response = await fetch(url);
    const relatedPosts = await response.json();
    return relatedPosts;
  }
);

const relatedPostSLice = createSlice({
  name: "relatedPosts",
  initialState: {
    relatedPosts: [],
    relatedPostTags: [],
    url: "https://jsonplaceholder.typicode.com/posts?title_like=",
  },
  reducers: {
    loadRelatedPost: (state, action) => {
      state.relatedPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("post/fetchPost/fulfilled", (state, action) => {
        state.relatedPostTags = action.payload.title.split(" ");
        state.url =
          state.url + action.payload.title.split(" ").join("&title_like=");
      })
      .addCase(fetchRelatedPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedPosts = action.payload;
      })
      .addCase(fetchRelatedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

module.exports = relatedPostSLice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts;

// .addCase(fetchRelatedPosts.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.relatedPost = action.payload;
//       })
//       .addCase(fetchRelatedPosts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error;
//       })
