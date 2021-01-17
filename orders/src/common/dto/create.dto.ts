import { ApiProperty } from "@nestjs/swagger";

export class CreateDto {
  @ApiProperty({ required: true })
  customerId: number;

  @ApiProperty({ required: true })
  item: number;

  @ApiProperty({ required: true })
  qty: number;

  // for e2e testing
  // true if forced approval
  // false if forced decline
  jgnpsiqbjxkdudavkrmafdrq?: boolean;
}
