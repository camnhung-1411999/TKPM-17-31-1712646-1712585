import ProductCollection, { IProduct } from "../models/product.model";

class productService {
  static async list(): Promise<IProduct[] | null> {
      return await ProductCollection.find();
  }
  
  static async listPage(page: number): Promise<IProduct[] | null> {
    let limit: number = 8;
    let offset: number = (page - 1) * 8;
    return await ProductCollection.find().skip(offset).limit(limit);
  }

  static async findByName(name: string): Promise<IProduct[]|null> {
  return await ProductCollection.find({$text:{$search: name}}).limit(8);    
  }

  static async listFollowType(type: String): Promise<IProduct[] | null> {
    return await ProductCollection.find({ type });
  }
  static async listFollowTypePage(page: number, type:String): Promise<IProduct[] | null> {
    let limit: number = 8;
    let offset: number = (page - 1) * 8;
    return await ProductCollection.find({type}).skip(offset).limit(limit);
  }
  static async find(type: string, idproduct: string): Promise<IProduct | null> {
    return await ProductCollection.findOne({ idproduct: idproduct, type:type });
  }
  static async create(product: IProduct): Promise<IProduct> {
    return await ProductCollection.create(product);
  }
  static async update(
    idproduct: String,
    product: Object
  ): Promise<IProduct | null> {
    return await ProductCollection.update({ idproduct }, product);
  }
  static async delete(product: String): Promise<IProduct | null> {
    return await ProductCollection.findOneAndDelete({ idproduct: product });
  }

  static async count(): Promise<number> {
    return await ProductCollection.find().count();
  }
  static async countType(type:String): Promise<number> {
    return await ProductCollection.find({type}).count();
  }
}
export default productService;
