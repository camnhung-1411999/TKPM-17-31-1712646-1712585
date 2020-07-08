import UserCollection,{IUser} from '../models/user.model';

class userService{
    static async list(): Promise<IUser[]>{
        const abc = await UserCollection.find({});
        return abc;
    }
    static find(user: string){
        return UserCollection.findOne({username: user});
    }
    static create(){
        return UserCollection.create({
            username: "Nhung123",
            password: "nhung",
            email: "nhung",
            phone:'0294',
            address:'asdf',
            name:'nhung',
            roles:'abc'
        });
    }
}
export default userService;