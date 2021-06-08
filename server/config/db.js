const mongoose = require('mongoose')
const connectDB = async () => {
     try {
          await mongoose.connect(process.env.MONGO_URI,
               {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false
               }, () => {
                    console.log(`DB successfully connected at host !`.green.bold)
               });

     } catch (error) {
          console.log(error.message);
          process.exit(1);

     }



}

module.exports = connectDB;