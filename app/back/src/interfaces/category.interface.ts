import { IImage } from "./image.interface";

export interface ICategory {
    name: string;
    description?: string;
    image?: IImage;
}