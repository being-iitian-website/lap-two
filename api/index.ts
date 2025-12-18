// api/index.ts
import serverless from "serverless-http";
import app from "../dist/app"; // app.ts compiled to dist/app.js

export default serverless(app);
