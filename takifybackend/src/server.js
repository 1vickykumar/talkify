import "dotenv/config";
import "./db/db.js";
import "./app.js";
import { server } from "./utils/socket.js";

const PORT = process.env.PORT || 2005;

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});