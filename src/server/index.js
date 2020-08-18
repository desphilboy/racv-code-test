import { app } from "./app";
import Houses, { INITIAL_DATA } from "./in-memory-db";

Houses.init(INITIAL_DATA);

let port = 6543 || process.env.SERVER_PORT;

app.listen(port, () => {
	console.log("now listennig on port: ", port);
});
