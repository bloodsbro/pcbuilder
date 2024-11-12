import {IsNotEmpty, IsNumber, IsPositive, IsString, Length, ValidateIf} from "class-validator";

export class AddComponentSpecificationDto {
  @IsNumber()
  @IsPositive()
  specificationId: number;

  @ValidateIf((o) => typeof o.value === 'string')
  @IsString()
  @IsNotEmpty()
  value: string | number;
}
