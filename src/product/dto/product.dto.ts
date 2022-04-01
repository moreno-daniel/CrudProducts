import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
    @ApiProperty({
        description: 'Name of Product',
        example: 'Mouse Gaming'
      })
    readonly name: string;

    @ApiProperty({
        description: 'Short Product Description',
        example: 'Mouse Gaming Logitech G305'
      })
    readonly description: string;

    @ApiProperty({
        description: 'URL of Product',
      })
    readonly imageURL: string;

    @ApiProperty({
        description: 'Price in USD',
        example: '1000'
      })
    readonly price: number;

    @ApiProperty({
        type: 'Date',
        description: 'Timestamp of Product Created',
        required: false
      })
    readonly createAt: Date;
}