"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const accountRouter = express_1.default.Router();
exports.accountRouter = accountRouter;
const prisma = new client_1.PrismaClient();
const SavedContentSchema = zod_1.z.object({
    title: zod_1.z.string(),
    url: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
});
const ListSchema = zod_1.z.object({
    name: zod_1.z.string(),
    contents: zod_1.z.array(SavedContentSchema),
});
const UserWithListsSchema = zod_1.z.object({
    userName: zod_1.z.string(),
    clerkId: zod_1.z.string(),
    email: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    lists: zod_1.z.array(ListSchema),
});
const list = zod_1.z.object({
    listName: zod_1.z.string(),
    userName: zod_1.z.string(),
});
const user = zod_1.z.object({
    userName: zod_1.z.string(),
    clerkId: zod_1.z.string(),
    email: zod_1.z.string(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const savedContent = zod_1.z.object({
    userName: zod_1.z.string(),
    clerkId: zod_1.z.string(),
    listName: zod_1.z.string(),
    title: zod_1.z.string(),
    url: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
});
function insertUser(userCredentials) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const user = yield prisma.user.findUnique({
                    where: { userName: userCredentials.userName },
                    select: { id: true }
                });
                if (user) {
                    throw new Error(`User already exists with userName: ${userCredentials.userName}`);
                }
                yield prisma.user.create({
                    data: {
                        userName: userCredentials.userName,
                        clerkId: userCredentials.clerkId,
                        email: userCredentials.email,
                        firstName: userCredentials.firstName,
                        lastName: userCredentials.lastName
                    }
                });
                return {
                    userCreationSuccess: true
                };
            }));
            return result;
        }
        catch (err) {
            console.log(err);
            return {
                userCreationSuccess: false
            };
        }
    });
}
function createList(userName, listName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const user = yield prisma.user.findUnique({
                    where: { userName: userName },
                    select: { id: true }
                });
                if (!user) {
                    throw new Error(`User not found with userName: ${userName}`);
                }
                yield prisma.list.create({
                    data: {
                        name: listName,
                        userId: user.id
                    }
                });
                return {
                    listCreationSuccess: true
                };
            }));
            return result;
        }
        catch (err) {
            console.log(err);
            return {
                listCreationSuccess: false
            };
        }
    });
}
function getAllListNames(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
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
        }
        catch (error) {
            console.error("Error fetching list names:", error);
            return [];
        }
    });
}
function getAllListContents(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: { userName: userName },
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
        catch (err) {
            console.log(err);
            return [];
        }
    });
}
function insertSavedContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                // Get user by clerkId
                const user = yield prisma.user.findUnique({
                    where: { clerkId: content.clerkId },
                    select: { id: true }
                });
                if (!user) {
                    throw new Error(`User not found with clerkId: ${content.clerkId}`);
                }
                // Find the list by name and userId
                const list = yield prisma.list.findFirst({
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
                yield prisma.savedContent.create({
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
            }));
            return result;
        }
        catch (err) {
            console.log(err);
            return {
                savedContentCreationSuccess: false
            };
        }
    });
}
function removeSavedContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                // Get user by clerkId
                const user = yield prisma.user.findUnique({
                    where: { clerkId: content.clerkId },
                    select: { id: true }
                });
                if (!user) {
                    throw new Error(`User not found with clerkId: ${content.clerkId}`);
                }
                // Find the list by name and userId
                const list = yield prisma.list.findFirst({
                    where: {
                        name: content.listName,
                        userId: user.id,
                    },
                    select: { id: true }
                });
                if (!list) {
                    throw new Error(`List not found with name: ${content.listName}`);
                }
                const savedContent = yield prisma.savedContent.findFirst({
                    where: { title: content.title },
                    select: { id: true }
                });
                if (!savedContent) {
                    throw new Error(`Saved content not found with title: ${content.title}`);
                }
                // Delete the link between List and SavedContent in ListSavedContents
                yield prisma.listSavedContents.deleteMany({
                    where: {
                        listId: list.id,
                        savedContentId: savedContent.id,
                    },
                });
                return {
                    savedContentDeletionSuccess: true
                };
            }));
            return result;
        }
        catch (err) {
            console.log(err);
            return {
                savedContentDeletionSuccess: false
            };
        }
    });
}
accountRouter.post('/create-user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = user.safeParse(req.body);
        if (!success) {
            res.status(411).json({
                msg: "Invalid input",
                success: false
            });
            return;
        }
        ;
        const result = yield insertUser(req.body);
        if (!(result === null || result === void 0 ? void 0 : result.userCreationSuccess)) {
            res.status(411).json({
                msg: "User Not created",
                success: false
            });
        }
        res.status(200).json({
            msg: "User created successfully",
            success: true
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(411).json({
            msg: "Error creating user",
            err: err
        });
        return;
    }
}));
accountRouter.post('/create-list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = list.safeParse(req.body);
        if (!success) {
            res.json({
                msg: "Invalid input",
                success: false
            });
            return;
        }
        ;
        const result = yield createList(req.body.userName, req.body.listName);
        if (!result.listCreationSuccess) {
            res.status(411).json({
                msg: "List Not created"
            });
        }
        res.status(200).json({
            msg: "list created successfully"
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.json({
            msg: "Error creating list",
            err: err
        });
        return;
    }
}));
accountRouter.post("/add-to-list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = savedContent.safeParse(req.body);
        if (!success) {
            res.json({
                msg: "Invalid input",
                success: false,
            });
            return;
        }
        const result = yield insertSavedContent(req.body);
        if (!result.savedContentCreationSuccess) {
            res.status(411).json({
                msg: "Content Not added to list",
            });
        }
        res.status(200).json({
            msg: "Content added to list successfully",
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error adding content to list",
            err: err,
        });
        return;
    }
}));
accountRouter.post("/remove-from-list", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = savedContent.safeParse(req.body);
        if (!success) {
            res.json({
                msg: "Invalid input",
                success: false,
            });
            return;
        }
        const result = yield removeSavedContent(req.body);
        if (!result.savedContentDeletionSuccess) {
            res.status(411).json({
                msg: "Content Not removed from list",
            });
        }
        res.status(200).json({
            msg: "Content removed from list successfully",
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error removing content from list",
            err: err,
        });
        return;
    }
}));
accountRouter.get("/user/:userName/lists", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName } = req.params;
        const result = yield getAllListNames(userName);
        if (result && 'lists' in result) {
            const listNames = result.lists.map((list) => list.name);
            res.status(200).json({ success: true, listNames });
        }
        else {
            res.status(404).json({ success: false, msg: 'Lists not found' });
        }
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error fetching lists",
            err: err,
        });
        return;
    }
}));
accountRouter.get("/user/:userName/listsContent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName } = req.params;
        const result = yield getAllListContents(userName);
        if (result && 'lists' in result) {
            const listsWithContents = result.lists.map(list => ({
                name: list.name,
                contents: list.savedContents.map(sc => sc.savedContent)
            }));
            const parsedData = UserWithListsSchema.parse({
                userName: result.userName,
                email: result.email,
                firstName: result.firstName,
                lastName: result.lastName,
                clerkId: result.clerkId,
                lists: listsWithContents,
            });
            res.json({ lists: parsedData.lists });
        }
        else {
            res.status(404).json({ success: false, msg: 'Lists not found' });
        }
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error fetching lists",
            err: err,
        });
        return;
    }
}));
