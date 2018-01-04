import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ItemModule} from "./item/item.module";
import {PublicBlogsBlogModule} from "./blog/public-blog.module";

@NgModule({
    imports: [
        ItemModule,
        PublicBlogsBlogModule,
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicBlogModule {
}
