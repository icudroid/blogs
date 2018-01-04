import {Routes} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {ItemDeletePopupComponent} from "./item-delete-dialog.component";
import {ItemPopupComponent} from "./item-dialog.component";
import {ItemDetailComponent} from "./item-detail.component";
import {ItemComponent} from "./item.component";
import {PublicItemComponent} from "./public-item.component";


export const blogItemRoute: Routes = [
    {
        path: 'public-blog/item',
        component: ItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogsApp.blogItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'public-blog/item/:id',
        component: ItemDetailComponent,
        data: {
            pageTitle: 'blogsApp.blogItem.home.title'
        }
    }, {
        path: 'public-blog/:blogname',
        component: PublicItemComponent,
        data: {
            pageTitle: 'blogsApp.blogItem.home.title'
        }
    }



];

export const blogItemPopupRoute: Routes = [
    {
        path: 'public-blog-item-new',
        component: ItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogsApp.blogItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'public-blog/item/:id/edit',
        component: ItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogsApp.blogItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'public-blog/item/:id/delete',
        component: ItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'blogsApp.blogItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
