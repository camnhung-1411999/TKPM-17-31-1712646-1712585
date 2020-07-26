import CommentCollection from '../models/comment.model';
import {IComment} from '../Components/comment';

class commentService{
    static async create(comment:any):Promise<IComment>{
        return await CommentCollection.create(comment);
    }

    static async list(idproduct: String, type: String): Promise<IComment[] | null>{
        return await CommentCollection.find({idproduct: idproduct, type: type});
    }
}

export default commentService;