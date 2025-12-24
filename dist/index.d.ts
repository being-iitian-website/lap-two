import http from "http";
import "./services/reward.subscriber";
declare const app: import("express-serve-static-core").Express;
declare const io: import("socket.io").Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
declare const server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
export { app, server, io };
export default app;
//# sourceMappingURL=index.d.ts.map