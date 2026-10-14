import mongoose  from 'mongoose';
import { cache } from 'react';
import { connectDB } from '@/lib/mongodb';
const mongo_url = Process.env.mongo_url;

if(!mongo_url) {
    throw new Error("mongodb url is not define");

}

let cached = global.mongoose;
if(!cached){
    cached = global.mongoose{
        conn:null,
        promise:null,
    }
};

async function connectDB() {
    if(mongoose.conn){
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise =  mongoose.connect(mongo_url)
    }
    cached.connc= await cached.promise;
    return cached.conn;
}

export default connectDB;
