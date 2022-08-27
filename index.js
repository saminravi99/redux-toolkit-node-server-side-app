const store = require("./rtk/app/store");
const { fetchPost } = require("./rtk/features/postSlice");
const { fetchRelatedPosts } = require("./rtk/features/relatedPostSlice");

const http = require("http");

//app object - module scaffolding
const app = {};

//configuration
app.config = {
  port: process.env.PORT || 3000,
};
app.handleReqRes = (req, res) => {
  res.end(JSON.stringify(store.getState(), null, 2));
};

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port);
  console.log(`Server is listening on port ${app.config.port}`);
};

//start the server
app.createServer();

//console the state on state change by subscription
store.subscribe(() => {
  console.log(JSON.stringify(store.getState(), null, 2));
});

//dispatch the actions asynchronously
store.dispatch(fetchPost(47)).then(() => {
  store.dispatch(fetchRelatedPosts(store.getState().relatedPosts.url));
});
// store.dispatch(fetchPost(55));
// store.dispatch(fetchRelatedPosts(store.getState().relatedPost.url));