import { BadRequestException } from "@nestjs/common"
import { Types } from "mongoose"


export function generateObjectId(id : string) : Types.ObjectId {
            try{
                return new Types.ObjectId(id) 
            }catch(e){
                throw new BadRequestException("id pattern is not correct")
            }
        }