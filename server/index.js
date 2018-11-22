// import server
const { server } = require("./server.js");

// server port
const port = process.env.PORT || 3300;
server.listen(port, () => {
    console.log(`Server is runnning on ${port}`);
}