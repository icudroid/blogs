import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BlogItemComponent } from './blog-item.component';
import { BlogItemDetailComponent } from './blog-item-detail.component';
import { BlogItemPopupComponent } from './blog-item-dialog.component';
import { BlogItemDeletePopupComponent } from './blog-item-delete-dialog.component';

export const blogItemRoute: Routes = [
    {
        path: 'blog-item',
        component: BlogItemComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'blogsApp.blogItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'blog-item/:id',
        component: BlogItemDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'blogsApp.blogItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const blogItemPopupRoute: Routes = [
    {
        path: 'blog-item-new',
        component: BlogItemPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'blogsApp.blogItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'blog-item/:id/edit',
        component: BlogItemPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'blogsApp.blogItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'blog-item/:id/delete',
        component: BlogItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN','ROLE_USER'],
            pageTitle: 'blogsApp.blogItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
