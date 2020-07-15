import mongoose from "mongoose";

export type IFavorite = mongoose.Document & {
  username: String;
  idproduct: String;
  type: String;
  image: String;
  nameproduct: String;
  price: String;
};
const favoriteSchema = new mongoose.Schema(
    {
      username: String,
      idproduct: String,
      type: String,
      image: String,
      nameproduct: String,
      price: String,
    },
    { timestamps: true }
  );
  
const FavoriteCollection = mongoose.model<IFavorite>("favorite", favoriteSchema);
export default FavoriteCollection;