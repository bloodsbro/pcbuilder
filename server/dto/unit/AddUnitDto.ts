import {IsString, Length} from "class-validator";

export class AddUnitDto {
  @IsString({ message: 'errors.unit.invalid' })
  @Length(1, 16, { message: 'errors.unit.invalid' })
  unit: string;
}
