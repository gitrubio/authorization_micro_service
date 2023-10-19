import app from "./app";
import config from "./config";
import './database/mongo.db'

app.listen(config.PORT, () => {
	console.log('Server is running on port', config.PORT);
});
