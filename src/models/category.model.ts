import mongoose from "mongoose";

export type ICategory = mongoose.Document & {
    code: string;
    name: string;
    number:number;
}

const categorySchema = new mongoose.Schema({
    code: {type:String, unique:true},
    name:String,
    number: Number
});

export const CategoryCollection = mongoose.model<ICategory>('category', categorySchema);