import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { groupEnd } from 'console';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';
import { ApiResponse,ApiParam, ApiBody } from '@nestjs/swagger';


@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create/')
    @ApiBody({type: CreateProductDTO})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product Created Succesfully'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product Not Created'
    })
    async createPos(@Res() res, @Body() createProductDTO: CreateProductDTO){
        console.log(createProductDTO);
        const product = await this.productService.createProduct(createProductDTO);
        if (!product) throw new NotFoundException('product Not Created');
        return res.status(HttpStatus.OK).json({
            messege: 'Product Successfully Created',
            product: product
        })
    }





    @Get('/products')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Reed All products Successfully'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'DB Empety'
    })
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        if (!products) throw new NotFoundException('DB Empety');
        return res.status(HttpStatus.OK).json({
            messege: 'Reed All products Successfully',
            products
        })
    }








    @Get('/:productID')
    @ApiParam({
        name: 'productID',
        required: true,
        description: 'Find product with Product ID',
        type: String
      })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product Finded Succesfully'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product Does Not Exists'
    })
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException('product Does Not Exists');
        return res.status(HttpStatus.OK).json(product);
    }




    @Delete('/delete/:productID') // route: /product/delete?productID=
    @ApiParam({
        name: 'productID',
        required: true,
        description: 'Product ID for Delete',
        type: String
      })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product Delete Succesfully'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product Does Not Exists'
    })
    async deleteProduct(@Res() res, @Param('productID') productID){
        const productDeleted = this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException('Product Does Not Exists');
        return res.status(HttpStatus.OK).json({
            messege: 'Product Deleted Succesfully',
            productDeleted
        });
    }





    @Put('/udpdate/:productID')
    @ApiParam({
        name: 'productID',
        required: true,
        description: 'Product ID for Update',
        type: String
      })
    @ApiBody({type: CreateProductDTO})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Product Updated Succesfully'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Product Does Not Exists'
    })
    async updateProduct(@Res() res, @Body() createProductDTO:CreateProductDTO, @Param('productID') productID): Promise<any>{
            const udpdatedProduct = this.productService.updateProduct(productID,createProductDTO);
            if (!udpdatedProduct) throw new NotFoundException('Product Does Not Exists');
            return res.status(HttpStatus.OK).json({
                messege: 'Product Updated Succesfully',
                udpdatedProduct
            });
        }
}
