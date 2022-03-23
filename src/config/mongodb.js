import { MongoClient } from "mongodb";
import { env } from "./environtment";
const uri = env.MONGO_URI

const client = new MongoClient(uri, {
    useUnifiedTopology:true,
    useNewUrlParser: true
})

export const connectDB = async () =>{
    try {
        //connect the client to the server
        await client.connect()
        console.log('Connected successfully to server')
        // list databases
        await listDatabases(client)

        
    } finally{
        //close client when finish or error
        await client.close()
    }
}

const listDatabases = async (client) =>{
    const databasesList = await client.db().admin().listDatabases()
    console.log(databasesList)
    console.log('Your database:')
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`)
    });
}