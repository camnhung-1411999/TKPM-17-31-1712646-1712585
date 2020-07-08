import 'dotenv/config';
import app from './App'
import Database from './src/utils/db';
const data = new Database();
app.listen(3000, function(){
    console.log('App is listenning on port 3000');
})