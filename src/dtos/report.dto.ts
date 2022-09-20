import { IsNumber, IsString, IsNotEmpty , IsPositive, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer'
import { ReportType } from 'src/data';

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

export class ReportResponseDTO {
  id: string;
  source: string;
  amount: number;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;
  type: ReportType

  @Expose({name: 'createdAt'})
  transformerCreatedAt() { 
    return this.created_at;
  }

  constructor(partial: Partial<ReportResponseDTO>) { 
    Object.assign(this, partial);
  }
}