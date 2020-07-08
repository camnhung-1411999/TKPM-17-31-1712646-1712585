import 'dotenv/config';
import app from './App'
import './src/utils/db'
app.listen(3000, function(){
    console.log('App is listenning on port 3000');
})