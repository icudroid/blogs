import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CommentBlogItemComponent } from './comment-blog-item.component';
import { CommentBlogItemDetailComponent } from './comment-blog-item-detail.component';
import { CommentBlogItemPopupComponent } from './comment-blog-item-dialog.component';
import { CommentBlogItemDeletePopupComponent } from './comment-blog-item-delete-dialog.component';

export const commentBlogItemRoute: Routes = [
    {
        path: 'comment-blog-item',
        component: CommentBlogItemComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'blogsApp.commentBlogItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'comment-blog-item/:id',
        component: CommentBlogItemDetailComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'blogsApp.commentBlogItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const commentBlogItemPopupRoute: Routes = [
    {
        path: 'comment-blog-item-new',
        component: CommentBlogItemPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'blogsApp.commentBlogItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-blog-item/:id/edit',
        component: CommentBlogItemPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'blogsApp.commentBlogItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'comment-blog-item/:id/delete',
        component: CommentBlogItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'blogsApp.commentBlogItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
