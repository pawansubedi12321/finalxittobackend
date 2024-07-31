import { PartialType } from '@nestjs/swagger';
import { CreateSystemStateDto } from './create-system-state.dto';

export class UpdateSystemStateDto extends PartialType(CreateSystemStateDto) {}
