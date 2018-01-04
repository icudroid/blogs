import { BaseEntity } from './../../shared';

export class BlogItem implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public text?: any,
        public created?: any,
        public updated?: any,
        public imageContentType?: string,
        public image?: any,
        public blogId?: number,
        public comments?: BaseEntity[],
        public authorId?: number,
        public tags?: BaseEntity[],
    ) {
    }
}
