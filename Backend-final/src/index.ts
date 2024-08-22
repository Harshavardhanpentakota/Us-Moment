import dotenv from 'dotenv';
dotenv.config({path:'../.env'}); 
console.log("Hello")

const port = Number(process.env.PORT) || 4000;

console.log(port);