import FavoriteCollection from "../models/favorite.model";
import IFavorite from "../Components/favorite"
class favoriteService {
    static async create(favorite: IFavorite): Promise<IFavorite> {
        return await FavoriteCollection.create(favorite);
    }
    static async delete(username: string, idproduct: string): Promise<IFavorite | null> {
        return await FavoriteCollection.findOneAndDelete({
            username: username,
            idproduct: idproduct,
        });
    }
    static async list(username: string): Promise<IFavorite[] | null> {
        return await FavoriteCollection.find({ username: username });
    }
    static async find(username: string, idproduct: string, type: string): Promise<IFavorite | null> {
        return await FavoriteCollection.findOne({ username, idproduct, type });
    }
}
export default favoriteService;
