import {CommentBlogItem, CommentBlogStatus} from "./index";
import {Author, BaseEntity} from "../../shared/index";

export class CommentWithAuthorModel {
    constructor(
        public id?: number,
        public title?: string,
        public text?: string,
        public created?: any,
        public updated?: any,
        public status?: CommentBlogStatus,
        public blogItemId?: number,
        public commentBlogItemId?: number,
        public replies?: BaseEntity[],
        public authorId?: number,
        public author?: Author,
    ) {

    }
}
