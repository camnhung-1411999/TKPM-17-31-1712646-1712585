import CategoryService from '../services/category.service';
import {Request, Response} from 'express';
import {ICategory} from '../models/category.model';
class CategoryController {
    static list(req: Request, res: Response){
        Promise.resolve(CategoryService.list()).then((result) =>{
            res.render('admin/categories', {
                title: "Manage categories",
                list: result
            });
        });
    }
    static find(req:Request){
        const code = req.params.code;
        return CategoryService.find(code);
    }
    static create(req:Request, res:Response){
        const data:any = {
            code: req.body.code,
            name: req.body.name,
            number: 0
        }
        CategoryService.create(data);
        res.redirect('/category');
    }
    static update(req: Request, res: Response) {
        const data: any = {
            code: req.params.code,
            name: req.body.uname || null,
            number: req.body.number || null
        }
        CategoryService.update(data);
        res.redirect('/category');
    }
    static delete(req: Request, res: Response){
        const code = req.params.code;
        CategoryService.delete(code);
        res.redirect('/category');
    }
}

export default CategoryController;