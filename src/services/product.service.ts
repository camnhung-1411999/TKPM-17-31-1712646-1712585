import ProductCollection, { IProduct } from '../models/product.model';

class productService {
    static async list(): Promise<IProduct[] | null> {
        return await ProductCollection.find();
    }
    static async listFollowType(type:String): Promise<IProduct[] | null> {
        return await ProductCollection.find({type});
    }
    static async find(type: string,idproduct: string): Promise<IProduct | null> {
        return await ProductCollection.findOne({ idproduct: idproduct });
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