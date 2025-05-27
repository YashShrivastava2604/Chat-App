import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        let connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected: ' + connection.connection.host);
    } catch(err){
        console.log('MongoDB connection error: ', err);
    }
};