import UserCollection,{IUser} from '../models/user.model';

class userService{
    static list(){
        return UserCollection.find({});
    }
    static find(user: string){
        return UserCollection.findOne({username: user});
    }
    static create(user: IUser){
        return UserCollection.create(user);
    }
}
export default userService;