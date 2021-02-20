import { ObjectID } from "mongodb";
import IBlock from "./block";

export default interface ILanding {
    _id: ObjectID;
    path: string;
    title: string;
    created_at: Date;
    updated_at: Date;
    author: string;
    blocks: IBlock[];
}