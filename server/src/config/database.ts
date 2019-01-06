import mongoose from "mongoose";

mongoose.connect("mongodb://testas:testas123@ds135952.mlab.com:35952/gymr-dev", { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch(err => console.log(err));

export { mongoose };

