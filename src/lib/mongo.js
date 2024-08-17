import mongoose from 'mongoose';

export async function connect() {
    try {
          mongoose.connect('mongodb+srv://parth-lms:rsQ3NYNcrxb542n7@cluster0.4roqkjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
     //   mongoose.connect('mongodb://localhost:27017/lms-e-lerning');
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);

    }


}