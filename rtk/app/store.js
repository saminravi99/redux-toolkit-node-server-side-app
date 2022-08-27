const { configureStore } = require("@reduxjs/toolkit");
const postReducer = require("../features/postSlice");
const relatedPostReducer = require("../features/relatedPostSlice");
const { logger } = require("redux-logger");

const store = configureStore({
  reducer: {
    post: postReducer,
    relatedPost: relatedPostReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger);
  },
});

module.exports = store;
