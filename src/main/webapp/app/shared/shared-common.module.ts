import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/fr';

import {
    BlogsSharedLibsModule,
    JhiLanguageHelper,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent
} from './';
import {MaxSizePipe} from "./utils/max-size.pipe";

@NgModule({
    imports: [
        BlogsSharedLibsModule
    ],
    declarations: [
        MaxSizePipe,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ],
    providers: [
        JhiLanguageHelper,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'fr'
        },
    ],
    exports: [
        BlogsSharedLibsModule,
        FindLanguageFromKeyPipe,
        MaxSizePipe,
        JhiAlertComponent,
        JhiAlertErrorComponent
    ]
})
export class BlogsSharedCommonModule {
    constructor() {
        registerLocaleData(locale);
    }
}
