import {IsEnum, IsString, Length} from "class-validator";

export enum ComponentCategories {
  processor = 'processor',
  ram = 'ram',
  ssd = 'ssd',
  hdd = 'hdd',
  gpu = 'gpu',
}

export enum ComponentBrand {
  intel = 'intel',
  amd = 'amd',
}

export class AddComponentDto {
  @IsEnum(ComponentCategories, { message: 'errors.component.category.invalid' })
  category: ComponentCategories;

  @IsString()
  @Length(4, 32, { message: 'errors.component.category.name' })
  name: string;

  @IsEnum(ComponentBrand, { message: 'errors.component.brand.invalid' })
  brand: ComponentBrand;

  @IsString()
  @Length(2, 64, { message: 'errors.component.brand.model' })
  model: string;
}
