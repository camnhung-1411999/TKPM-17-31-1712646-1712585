import {CategoryCollection, ICategory} from '../models/category.model';
class CategoryService {
    static async list(){
        return await CategoryCollection.find();
    }
    static async find(code: string){
        return await CategoryCollection.findOne({code:code});
    }
    static async create(cate: ICategory){
        return await CategoryCollection.create({
            code: cate.code,
            name: cate.name,
            number:cate.number
        });
    }
    static async update(cate: ICategory){
        const condition = {
            name: cate.name,
            code: cate.name
        }
        if(condition.name === null){
            delete condition.name;
        }
        if(condition.code === null){
            delete condition.code;
        }
        return await CategoryCollection.findOneAndUpdate({
            code: cate.code
        },condition,{new: true})
    }
    static async delete(code:string){
        return await CategoryCollection.findOneAndRemove({code:code});
    }
}
export default CategoryService;