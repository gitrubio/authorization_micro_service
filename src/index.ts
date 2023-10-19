import app from "./app";
import './database/mongo.db'

app.listen(3000, () => {
	console.log('Server is running on port', 3000);
});
