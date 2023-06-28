const {createClient}=require("redis")
require("dotenv").config()
const client = createClient({
    password: process.env.redisPassword,
    socket: {
        host: process.env.host,
        port: process.env.redisPort
    }
});
client.connect();
module.exports={
    client
}