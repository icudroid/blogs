import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {BlogsSharedModule} from '../../shared';
import {BlogsAdminModule} from '../../admin/admin.module';
import {blogItemPopupRoute, blogItemRoute,} from './';
import {ItemComponent} from "./item.component";
import {ItemDetailComponent} from "./item-detail.component";
import {ItemDialogComponent, ItemPopupComponent} from "./item-dialog.component";
import {ItemDeleteDialogComponent, ItemDeletePopupComponent} from "./item-delete-dialog.component";
import {ItemPopupService} from "./item-popup.service";
import {PublicItemComponent} from "./public-item.component";
import {CommentComponent} from "./comment/comment.component";
import {CommentByBlogItemComponent} from "./comment/comment-by-blog-item.component";
import {LeaveCommentComponent} from "./comment/leave-comment.component";
import {TimeAgoPipe} from "time-ago-pipe";


const ENTITY_STATES = [
    ...blogItemRoute,
    ...blogItemPopupRoute,
];

@NgModule({
    imports: [
        BlogsSharedModule,
        BlogsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PublicItemComponent,
        ItemComponent,
        ItemDetailComponent,
        ItemDialogComponent,
        ItemDeleteDialogComponent,
        ItemPopupComponent,
        ItemDeletePopupComponent,
        CommentComponent,
        CommentByBlogItemComponent,
        LeaveCommentComponent,
        TimeAgoPipe,

    ],
    entryComponents: [
        PublicItemComponent,
        ItemComponent,
        ItemDialogComponent,
        ItemPopupComponent,
        ItemDeleteDialogComponent,
        ItemDeletePopupComponent,
    ],
    providers: [
        ItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ItemModule {}
