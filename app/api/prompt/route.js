import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

/*
populate() method is used to replace the user ObjectId field with the whole document consisting of all the user data.
{
    "_id": "5f9e3b3b1c9d440000b1e3b3",
    "prompt": "test"
    "creator": {
        "_id": "5f9e3b3b1c9d440000b1e3b2",
        "username": "test",
    },
    // instead of just the ObjectId "creator" : "5f9e3b3b1c9d440000b1e3b3"
}
*/