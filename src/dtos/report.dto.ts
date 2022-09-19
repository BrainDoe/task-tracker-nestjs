import { IsNumber, IsString, IsNotEmpty , IsPositive, IsOptional } from 'class-validator'

export class ReportDTO {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}

export class UpdateReportDTO { 
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
  
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

}