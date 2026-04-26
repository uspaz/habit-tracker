import { checkHabitToday } from "@/lib/services/Date"
import { Prisma } from '../../app/generated/prisma/client'

export async function uniqueCheck (habitId: string){
    try{        
        const entry = await checkHabitToday(habitId)
        return { status: "checked", entry }
    
    }catch(error: unknown){
        
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"){
            return Response.json({ status: "already_checked" })
        }
        
        throw error
    }
}
