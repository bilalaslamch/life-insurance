import { IsEnum, IsInt, IsNumber, Min } from 'class-validator';

export enum RiskTolerance {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export class CreateRecommendationDto {
  @IsInt()
  @Min(0)
  age: number;

  @IsNumber()
  @Min(0)
  income: number;

  @IsInt()
  @Min(0)
  numberOfDependents: number;

  @IsEnum(RiskTolerance)
  riskTolerance: RiskTolerance;
}
