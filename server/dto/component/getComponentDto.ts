import {ComponentCategories} from "~~/server/dto/component/addComponentDto";
import {IsEnum, IsNumber, IsPositive, Max, Min} from "class-validator";
import {Type} from "class-transformer";

export class GetComponentDto {
  @IsEnum(ComponentCategories, { message: 'errors.component.category.invalid' })
  category: ComponentCategories;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number) // Преобразование значения в число
  page: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsPositive()
  @Type(() => Number) // Преобразование значения в число
  limit: number;
}
