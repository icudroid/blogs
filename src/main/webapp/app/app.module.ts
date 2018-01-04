import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { BlogsSharedModule, UserRouteAccessService } from './shared';
import { BlogsAppRoutingModule} from './app-routing.module';
import { BlogsHomeModule } from './home/home.module';
import { BlogsAdminModule } from './admin/admin.module';
import { BlogsAccountModule } from './account/account.module';
import { BlogsEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import {PublicBlogModule} from "./public-blog/public-blog.module";

@NgModule({
    imports: [
        BrowserModule,
        BlogsAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        BlogsSharedModule,
        BlogsHomeModule,
        BlogsAdminModule,
        BlogsAccountModule,
        BlogsEntityModule,
        PublicBlogModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class BlogsAppModule {}
