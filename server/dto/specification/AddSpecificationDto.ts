import {ArrayNotEmpty, IsArray, IsEnum, IsString, Length} from "class-validator";
import {ComponentCategories} from "~~/server/dto/component/addComponentDto";

export enum UnitEnum {
  ghz = 'GHz',
  mhz = 'MHz',
}

export class AddSpecificationDto {
  @IsString()
  @Length(2, 32, { message: 'errors.specification.name.invalid' })
  name: string;

  @IsArray({ message: 'errors.specification.type.invalid' })
  @ArrayNotEmpty({ message: 'errors.specification.type.invalid' })
  @IsEnum(ComponentCategories, { each: true, message: 'errors.specification.type.invalid' })
  applicableTypes: ComponentCategories[];

  @IsEnum(UnitEnum, { message: 'errors.specification.unit.invalid' })
  unit: UnitEnum;
}
