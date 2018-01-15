import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogsSharedModule } from '../../shared';
import { BlogsAdminModule } from '../../admin/admin.module';
import {blogPopupRoute} from "./public-blog.route";
import {PublicBlogDialogComponent, PublicBlogPopupComponent} from "./public-blog-dialog.component";
import {BlogPopupService} from "../../entities/blog";
import {PublicBlogPopupService} from './public-blog-popup.service';

const ENTITY_STATES = [
    ...blogPopupRoute,
];

@NgModule({
    imports: [
        BlogsSharedModule,
        BlogsAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PublicBlogPopupComponent,
        PublicBlogDialogComponent,
    ],
    entryComponents: [
        PublicBlogDialogComponent,
        PublicBlogPopupComponent,
    ],
    providers: [
        BlogPopupService,
        PublicBlogPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicBlogsBlogModule {}
