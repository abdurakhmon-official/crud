import { IsNumber, IsString, Max, Min } from "class-validator";

export class Product {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(1000)
  quantity: number;

  @IsNumber()
  @Min(1)
  @Max(100000)
  price: number;
}
