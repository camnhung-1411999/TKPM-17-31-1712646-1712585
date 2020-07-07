const Util = {
    mongo:{
        host: process.env.MONGODB_HOST || '',
        user: process.env.MONGODB_USER || 'root',
        pass: process.env.MONGODB_PASS || 'root',
        port: process.env.MONGODB_PORT || '27017',
        db: process.env.MONGODB_DB || 'osshoe',
    },
    AppPort: process.env.APP_PORT || 3000,
}

if(!Util.mongo.host) {
    console.log("No mongo connection string. Set MONGODB_URI enviroment variable.");
    process.exit(1);
}
export default Util;
