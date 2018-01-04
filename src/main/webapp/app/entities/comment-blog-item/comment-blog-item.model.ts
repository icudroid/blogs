import { BaseEntity } from './../../shared';

export const enum CommentBlogStatus {
    'CREATED',
    'VALIDATED',
    'LOCKED'
}

export class CommentBlogItem implements BaseEntity {
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
    ) {
    }
}
