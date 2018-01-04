import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogsSharedModule } from '../../shared';
import { BlogsAdminModule } from '../../admin/admin.module';
import {
    CommentBlogItemService,
    CommentBlogItemPopupService,
    CommentBlogItemComponent,
    CommentBlogItemDetailComponent,
    CommentBlogItemDialogComponent,
    CommentBlogItemPopupComponent,
    CommentBlogItemDeletePopupComponent,
    CommentBlogItemDeleteDialogComponent,
    commentBlogItemRoute,
    commentBlogItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...commentBlogItemRoute,
    ...commentBlogItemPopupRoute,
];

@NgModule({
    imports: [
        BlogsSharedModule,
        BlogsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CommentBlogItemComponent,
        CommentBlogItemDetailComponent,
        CommentBlogItemDialogComponent,
        CommentBlogItemDeleteDialogComponent,
        CommentBlogItemPopupComponent,
        CommentBlogItemDeletePopupComponent,
    ],
    entryComponents: [
        CommentBlogItemComponent,
        CommentBlogItemDialogComponent,
        CommentBlogItemPopupComponent,
        CommentBlogItemDeleteDialogComponent,
        CommentBlogItemDeletePopupComponent,
    ],
    providers: [
        CommentBlogItemService,
        CommentBlogItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogsCommentBlogItemModule {}
