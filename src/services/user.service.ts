import UserCollection,{IUser} from '../models/user.model';

class userService{
    static async list(): Promise<IUser[] | null>{
        const users = await UserCollection.find({});
        return users;
    }
    static async find(user: string): Promise<IUser | null>{
        return await UserCollection.findOne({username: user});
    }
    static async create(user: IUser): Promise<IUser | null>{
        return await UserCollection.create(user);
    }
    static async update(username:string, user: Object): Promise<IUser>{
        return await UserCollection.update({username},user);
    }
    static async delete(username:string):Promise<IUser | null>{
        return await UserCollection.findOneAndDelete({username:username});
    }

}
export default userService;