import { IsString, IsUrl, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

class CreateUrlPartial {
  @IsString()
  readonly expiresAt?: ReturnType<Date['toUTCString']>;

  @IsString()
  readonly alias?: string;
}

export class CreateUrlDto extends PartialType(CreateUrlPartial) {
  @IsUrl()
  readonly originalUrl: string;
}
