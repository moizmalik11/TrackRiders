import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT || 5001,
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/rider-app",
    JWT_SECRET: "dalskfjaldskfjlska;djfals;kdjf"
};

export default config; 