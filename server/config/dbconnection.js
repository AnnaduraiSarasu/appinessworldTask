 const mongoose =require('mongoose');
const config =require('./local');

const dbController = {
    connect: () => {
        mongoose.connect(
            config.mongoURL,
            { useNewUrlParser: true },
            (err) => {
                if (err) {
                    console.log('MongoDB Connection Failure');
                } else {
                    console.log('Successfully connected TO MongoDB');
                }
            }
        );
    }
};

module.exports= dbController;
