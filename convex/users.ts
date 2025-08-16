// for user data
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser= mutation({
    args:{
        name: v.string(),
        email: v.string(),
        imgUrl:v.string(),
    },
    handler: async (ctx, args) => {
        // if user already exisit 
        const user= await ctx.db.query('UserTable')
        .filter( q=>q.eq(q.field('email'), args.email)).collect();
        
        // if not insert new user to databse
        if(user?.length==0)
            {
                const data={
                    email:args.email,
                    imgUrl:args?.imgUrl,
                    name:args.name
                
                }
                const result = await ctx.db.insert('UserTable', {
                    ...data,
                   
                });
          
          
                // _id: data.id, // Uncomment if you want to set a specific ID
            console.log("User created:", result);
            return {
                ...data,
                 result
                // _id: result._id, // Return the newly created user's ID
            }

              
        }
        return user[0]; // Return the existing user if found
    }
})