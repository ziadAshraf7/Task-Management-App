import { PartialType } from "@nestjs/mapped-types";
import { IsMongoId } from "class-validator";
import { Types } from "mongoose";
import { CreateUserDto } from "./createUser.dto";



export default class UpdateUserDto extends PartialType(CreateUserDto) {

}