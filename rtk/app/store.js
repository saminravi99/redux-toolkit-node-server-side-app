//dependencies
const { configureStore } = require("@reduxjs/toolkit");
const postReducer = require("../features/postSlice");
const relatedPostReducer = require("../features/relatedPostSlice");
const { logger } = require("redux-logger");

//configuring the store
const store = configureStore({
  reducer: {
    post: postReducer,
    relatedPosts: relatedPostReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

//export module
module.exports = store;
