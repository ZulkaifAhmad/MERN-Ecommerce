import 'dotenv/config';
import app from './src/app.js';
import db_connect from './src/Config/db.js';

const port = process.env.PORT
const mongodb_uri = process.env.MONGODB_URI

db_connect(mongodb_uri)

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

