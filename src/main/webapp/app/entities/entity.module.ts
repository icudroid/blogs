import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BlogsBlogModule } from './blog/blog.module';
import { BlogsBlogItemModule } from './blog-item/blog-item.module';
import { BlogsTagModule } from './tag/tag.module';
import { BlogsCommentBlogItemModule } from './comment-blog-item/comment-blog-item.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BlogsBlogModule,
        BlogsBlogItemModule,
        BlogsTagModule,
        BlogsCommentBlogItemModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogsEntityModule {}
