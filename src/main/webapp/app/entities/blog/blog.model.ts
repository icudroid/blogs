import { BaseEntity } from './../../shared';

export class Blog implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public subtitle?: string,
        public descritpion?: string,
        public imageContentType?: string,
        public image?: any,
        public authorId?: number,
        public items?: BaseEntity[],
    ) {
    }
}
