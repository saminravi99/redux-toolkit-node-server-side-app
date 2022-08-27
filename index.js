const store = require("./rtk/app/store");
const { fetchPost } = require("./rtk/features/postSlice");
const { fetchRelatedPosts } = require("./rtk/features/relatedPostSlice");

const http = require('http');

store.subscribe(() => {
  console.log(JSON.stringify(store.getState(), null, 2));
});

store.dispatch(fetchPost(57)).then(() => {
  store.dispatch(fetchRelatedPosts(store.getState().relatedPost.url));
});


//app object - module scaffolding
const app = {};

//configuration
app.config = {
  port: process.env.PORT || 3000,
};

app.handleReqRes = (req, res) => {
  res.end(JSON.stringify(store.getState(), null, 2));
}

//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(app.config.port);
  console.log(`Server is listening on port ${app.config.port}`);
};

app.createServer();