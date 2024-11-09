import express, {Request,Response,Router } from 'express';
import {boolean, z} from 'zod';
import { PrismaClient,Prisma } from '@prisma/client';
import { authMiddleware } from '../middleware/middleware';
import { url } from 'inspector';

const accountRouter: Router = express.Router();

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    userId?: string;
}

const SavedContentSchema = z.object({
    title: z.string(),
    url: z.string(),
    description: z.string().nullable(),
  });
  
  const ListSchema = z.object({
    name: z.string(),
    contents: z.array(SavedContentSchema),
  });
  
  const UserWithListsSchema = z.object({
    userName: z.string(),
    clerkId: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    lists: z.array(ListSchema),
  });

const list = z.object({
    listName: z.string(),
    userName: z.string(),
})

const user = z.object({
    userName: z.string(),
    clerkId: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
})

const savedContent = z.object({
    userName: z.string(),
    clerkId: z.string(),
    listName: z.string(),
    title: z.string(),
    url: z.string(),
    description: z.string().nullable(),
})

type Credentials = z.infer<typeof user>;

async function insertUser(userCredentials: Credentials) {
    try{
        const result = await prisma.$transaction(async (prisma) =>{
            const user = await prisma.user.findUnique({
                where: {userName: userCredentials.userName},
                select: {id:true}
            })
            if(user){
                throw new Error(`User already exists with userName: ${userCredentials.userName}`);
            }
            await prisma.user.create({
                data: {
                    userName: userCredentials.userName,
                    clerkId: userCredentials.clerkId,
                    email: userCredentials.email,
                    firstName: userCredentials.firstName,
                    lastName: userCredentials.lastName
                }
            })
            return {
                userCreationSuccess: true
            }
        })
        return result;
    }
    catch(err){
        console.log(err);
        return {
            userCreationSuccess: false
        }
    }
}

async function createList(userName:string,listName: string) {
   try{
    const result = await prisma.$transaction(async (prisma) => {
        const user= await prisma.user.findUnique({
            where: {userName:userName},
            select: {id:true}
        })
        if(!user){
            throw new Error(`User not found with userName: ${userName}`);
        }
        await prisma.list.create({
            data: {
                name: listName,
                userId: user.id
            }
        })
        return {
            listCreationSuccess: true
        }
    })
    return result;
   } 
   catch(err){
    console.log(err);
    return {
        listCreationSuccess: false
    }
   }  
}

async function getAllListNames(userName:string) {
    try {
        const user = await prisma.user.findUnique({
            where: { userName: userName },
            include: {
              lists: {
                select: {
                  name: true
                }
              }
            }
          });
          if (!user) {
            throw new Error("User not found");
          }
          return user;
    } catch (error) {
      console.error("Error fetching list names:", error);
      return [];
    }
}

async function getAllListContents(userName:string) {
    try{
        const user = await prisma.user.findUnique({
            where: { userName:userName },
            include: {
              lists: {
                include: {
                  savedContents: {
                    select: {
                      savedContent: {
                        select: {
                          title: true,
                          url: true,
                          description: true
                        }
                      }
                    }
                  }
                }
              }
            }
          });
      
          if (!user) {
            throw new Error("User not found");
          }
          return user;
    }
    catch(err){
        console.log(err);
        return []
    }
}

async function insertSavedContent(content: z.infer<typeof savedContent>) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        // Get user by clerkId
        const user = await prisma.user.findUnique({
          where: { clerkId: content.clerkId },
          select: { id: true }
        });
        
        if (!user) {
          throw new Error(`User not found with clerkId: ${content.clerkId}`);
        }
  
        // Find the list by name and userId
        const list = await prisma.list.findFirst({
          where: {
            name: content.listName,
            userId: user.id,
          },
          select: { id: true }
        });
  
        if (!list) {
          throw new Error(`List not found with name: ${content.listName}`);
        }
  
        // Create the saved content linked to the list
        await prisma.savedContent.create({
          data: {
            title: content.title,
            url: content.url,
            description: content.description,
            lists: {
              create: {
                listId: list.id
              }
            }
          }
        });
  
        return {
          savedContentCreationSuccess: true
        };
      });
  
      return result;
    } catch (err) {
      console.log(err);
      return {
        savedContentCreationSuccess: false
      };
    }
}

async function removeSavedContent(content: z.infer<typeof savedContent>) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.findUnique({
          where: { clerkId: content.clerkId },
          select: { id: true }
        });
        
        if (!user) {
          throw new Error(`User not found with clerkId: ${content.clerkId}`);
        }

        const list = await prisma.list.findFirst({
          where: {
            name: content.listName,
            userId: user.id,
          },
          select: { id: true } 
        });
  
        if (!list) {
          throw new Error(`List not found with name: ${content.listName}`);
        }
  
        const savedContent = await prisma.savedContent.findFirst({
          where: { title: content.title },
          select: { id: true }
        });
  
        if (!savedContent) {
          throw new Error(`Saved content not found with title: ${content.title}`);
        }
  
        // Delete the link between List and SavedContent in ListSavedContents
        await prisma.listSavedContents.deleteMany({
          where: {
            listId: list.id,
            savedContentId: savedContent.id,
          },
        });
  
        return {
          savedContentDeletionSuccess: true
        };
      });
  
      return result;
    } catch (err) {
      console.log(err);
      return {
        savedContentDeletionSuccess: false
      };
    }
  }

accountRouter.post('/create-user',async (req:AuthenticatedRequest,res:Response) => {
    try{
        const {success} = user.safeParse(req.body) ;
        if(!success){
            res.status(411).json({
                msg:"Invalid input",
                success:false
            })
            return; 
        };
        const result = await insertUser(req.body);
        if(!result?.userCreationSuccess){
            res.status(411).json({
                msg:"User Not created",
                success:false
            })
        }
        res.status(200).json({
            msg:"User created successfully",
            success:true
        })
        return;
    }
    catch(err){
        console.log(err);
        res.status(411).json({
            msg:"Error creating user",
            err:err
        })
        return;
    }
})


accountRouter.post('/create-list',async (req:AuthenticatedRequest ,res:Response) => {
    try{
        const {success} = list.safeParse(req.body) ;
        if(!success){
            res.json({
                msg:"Invalid input",
                success:false
            })
            return; 
        };
        const result = await createList(req.body.userName, req.body.listName);
        if(!result.listCreationSuccess ){
            res.status(411).json({
                msg:"List Not created"
            })
        }
        res.status(200).json({
            msg:"list created successfully"
        })
        return;
    }
    catch(err){
        console.log(err);
        res.json({
            msg:"Error creating list",
            err:err
        })
        return;
    }
})

accountRouter.post("/add-to-list", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { success } = savedContent.safeParse(req.body);
        if (!success) {
            res.json({
                msg: "Invalid input",
                success: false,
            });
            return;
        }
        const result = await insertSavedContent(req.body);
        if (!result.savedContentCreationSuccess) {
            res.status(411).json({
                msg: "Content Not added to list",
            });
        }
        res.status(200).json({
            msg: "Content added to list successfully",
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error adding content to list",
            err: err,
        });
        return;
    }
});

accountRouter.post("/remove-from-list", async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { success } = savedContent.safeParse(req.body);
        if (!success) {
            res.json({
                msg: "Invalid input",
                success: false,
            });
            return;
        }
        const result = await removeSavedContent(req.body);
        if (!result.savedContentDeletionSuccess) {
            res.status(411).json({
                msg: "Content Not removed from list",
            });
        }
        res.status(200).json({
            msg: "Content removed from list successfully",
        });
        return;
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Error removing content from list",
        err: err,
      })
      return;
    }
})

accountRouter.get("/user/:userName/lists",  async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {userName} = req.params;
        const result = await getAllListNames(userName);
        if (result && 'lists' in result) {
            const listNames = result.lists.map((list) => list.name)
            res.status(200).json({ success: true, listNames });
        } else {
            res.status(404).json({ success: false, msg: 'Lists not found' });
        }
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error fetching lists",
            err: err,
        });
        return;
    }
})

accountRouter.get("/user/:userName/listsContent",  async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {userName} = req.params;
        const result = await getAllListContents(userName);
        if (result && 'lists' in result) {
            const listsWithContents = result.lists.map(list => ({
                name: list.name,
                contents: list.savedContents.map(sc => sc.savedContent)
              }));
              const parsedData = UserWithListsSchema.parse({
                userName:result.userName,
                email:result.email,
                firstName:result.firstName,
                lastName:result.lastName,
                clerkId:result.clerkId,
                lists: listsWithContents,
              });
          
              res.json({ lists: parsedData.lists });
        } else {
            res.status(404).json({ success: false, msg: 'Lists not found' });
        }
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error fetching lists",
            err: err,
        });
        return;
    }
})

export { accountRouter };


