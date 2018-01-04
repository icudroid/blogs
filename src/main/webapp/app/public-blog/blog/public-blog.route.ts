import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {PublicBlogPopupComponent} from "./public-blog-dialog.component";

export const blogPopupRoute: Routes = [
    {
        path: 'public-blog-new',
        component: PublicBlogPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_ADMIN'],
            pageTitle: 'blogsApp.blog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'public-blog/blog/:id/edit',
        component: PublicBlogPopupComponent,
        data: {
            authorities: ['ROLE_USER','ROLE_ADMIN'],
            pageTitle: 'blogsApp.blog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
