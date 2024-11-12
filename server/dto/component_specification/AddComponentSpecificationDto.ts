import {IsNumber, IsPositive, IsString, Length} from "class-validator";

export class AddComponentSpecificationDto {
  @IsNumber()
  @IsPositive()
  specificationId: number;

  @Length(1, 32)
  value: string | number;
}
