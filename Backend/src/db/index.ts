import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser ( email:string, password:string, firstName: string, lastName: string ) {
   const response = await prisma.user.create({
        data: {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
    })
}

export default prisma;