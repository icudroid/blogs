import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogsSharedModule } from '../../shared';
import { BlogsAdminModule } from '../../admin/admin.module';
import {
    BlogItemService,
    BlogItemPopupService,
    BlogItemComponent,
    BlogItemDetailComponent,
    BlogItemDialogComponent,
    BlogItemPopupComponent,
    BlogItemDeletePopupComponent,
    BlogItemDeleteDialogComponent,
    blogItemRoute,
    blogItemPopupRoute,
} from './';

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
        BlogItemComponent,
        BlogItemDetailComponent,
        BlogItemDialogComponent,
        BlogItemDeleteDialogComponent,
        BlogItemPopupComponent,
        BlogItemDeletePopupComponent,
    ],
    entryComponents: [
        BlogItemComponent,
        BlogItemDialogComponent,
        BlogItemPopupComponent,
        BlogItemDeleteDialogComponent,
        BlogItemDeletePopupComponent,
    ],
    providers: [
        BlogItemService,
        BlogItemPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogsBlogItemModule {}
