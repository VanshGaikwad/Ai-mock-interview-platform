import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema ({
    UserTable:defineTable({
        name:v.string(), 
        imgUrl:v.string(),
        email:v.string(),

    })
})