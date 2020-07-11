import ProductCollection, { IProduct } from '../models/product.model';

class productService {
    static async list(): Promise<IProduct[] | null> {
        return await ProductCollection.find();
    }
    static async find(product: string): Promise<IProduct | null> {
        return await ProductCollection.findOne({ idproduct: product });
    }
    static async create(product: IProduct): Promise<IProduct> {
        return await ProductCollection.create(product);
    }
    static async update(idproduct: String, product: IProduct): Promise<IProduct | null> {
        return await ProductCollection.update({ idproduct }, product);
    }
    static async delete(product: String): Promise<IProduct | null> {
        return await ProductCollection.findOneAndDelete({ idproduct: product });
    }
}
export default productService;