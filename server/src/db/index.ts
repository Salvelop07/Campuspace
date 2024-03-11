import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI as string}/arsdcollege`)
        console.log("MongoDb Connected:", connectionInstance.connection.host)
    } catch (err) {
        console.log("MONGODB_CONNECTION_ERROR !!!!", err)
        process.exit(1)
    }
}

export default connectDB