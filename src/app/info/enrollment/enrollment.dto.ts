import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateEnrollmentDto {
  @IsString()
  readonly CourseID: string;

  @IsString()
  readonly StudentID: string;

  @IsNumber()
  readonly Grade: number;

  @IsBoolean()
  @IsOptional()
  readonly IsDeleted?: boolean;
}

export class UpdateEnrollmentDto {
  @IsNumber()
  readonly Grade: number;

  @IsBoolean()
  @IsOptional()
  readonly IsDeleted?: boolean;
}
