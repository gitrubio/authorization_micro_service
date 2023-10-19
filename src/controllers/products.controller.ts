import { Request, Response } from 'express';
import Product from '../models/Product';
import { IProduct } from '../interfaces/product.interface';
import STATUS_CODES from '../constants';

export const createProduct = async (req: Request, res: Response) => {
	try {
		const { name, category, imgURL, price } = req.body as IProduct;
		const newProduct = new Product({ name, category, imgURL, price });
		const productSave = await newProduct.save();
		res.status(STATUS_CODES.CREATED).json(productSave);
	} catch (error) {
		res
			.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
			.send('Error creating product');
	}
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await Product.find();
		res.status(STATUS_CODES.OK).json(products);
	} catch (error) {
		res
			.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
			.send('Error getting products');
	}
};

export const getProductById = async (req: Request, res: Response) => {
	try {
		const { productId } = req.params;
		const product = await Product.findById(productId);
		res.status(STATUS_CODES.OK).json(product);
	} catch (error) {
		res
			.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
			.send('Error getting product');
	}
};

export const updateProductById = async (req: Request, res: Response) => {
	try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        });
        res.status(STATUS_CODES.OK).json(updatedProduct);
	} catch (error) {
        res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send('Error updating product');
    }
};

export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        await Product.findByIdAndDelete(productId);
        res.status(STATUS_CODES.OK).json({message: 'Product deleted'});
    } catch (error) {
        res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send('Error deleting product');
    }
};
