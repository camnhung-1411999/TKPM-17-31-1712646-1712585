import CategoryService from '../services/category.service';
import {Request, Response} from 'express';
import {ICategory} from '../models/category.model';
class CategoryController {
    static list(req: Request, res: Response){
        Promise.resolve(CategoryService.list()).then((result) =>{
            res.render('admin/categories', {
                title: "Manage categories",
                list: result,
                user: "Admin",
                admin: true
            });
        });
    }
    static find(req:Request){
        const code = req.params.code;
        return CategoryService.find(code);
    }
    static async create(req:Request, res:Response){
        const data:any = {
            code: req.body.code,
            name: req.body.name,
            number: 0
        }
        await CategoryService.create(data);
        res.redirect('/category');
    }
    static async update(req: Request, res: Response) {
        const data: any = {
            code: req.body.oldcate,
            name: req.body.newcate,
            number: req.body.newid
        }
        await CategoryService.update(data);
        res.redirect('/category');
    }
    static async delete(req: Request, res: Response){
        const code = req.body.cate;
        console.log(code)
        await CategoryService.delete(code);
        res.redirect('/category');
    }
}

export default CategoryController;