import { IsString, Length } from "class-validator";

export class AddSkillRequest {
  @IsString()
  @Length(1, 20)
  name!: string;
}
