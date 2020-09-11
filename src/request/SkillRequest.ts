import { IsString, Length } from "class-validator";

export abstract class SkillRequest {
  @IsString()
  @Length(1, 20)
  skill!: string;
}
