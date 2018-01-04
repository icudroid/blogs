import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CommentBlogItem } from './comment-blog-item.model';
import { CommentBlogItemPopupService } from './comment-blog-item-popup.service';
import { CommentBlogItemService } from './comment-blog-item.service';
import { BlogItem, BlogItemService } from '../blog-item';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-comment-blog-item-dialog',
    templateUrl: './comment-blog-item-dialog.component.html'
})
export class CommentBlogItemDialogComponent implements OnInit {

    commentBlogItem: CommentBlogItem;
    isSaving: boolean;

    blogitems: BlogItem[];

    commentblogitems: CommentBlogItem[];

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private commentBlogItemService: CommentBlogItemService,
        private blogItemService: BlogItemService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.blogItemService.query()
            .subscribe((res: ResponseWrapper) => { this.blogitems = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.commentBlogItemService.query()
            .subscribe((res: ResponseWrapper) => { this.commentblogitems = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.commentBlogItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentBlogItemService.update(this.commentBlogItem));
        } else {
            this.subscribeToSaveResponse(
                this.commentBlogItemService.create(this.commentBlogItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<CommentBlogItem>) {
        result.subscribe((res: CommentBlogItem) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CommentBlogItem) {
        this.eventManager.broadcast({ name: 'commentBlogItemListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBlogItemById(index: number, item: BlogItem) {
        return item.id;
    }

    trackCommentBlogItemById(index: number, item: CommentBlogItem) {
        return item.id;
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-comment-blog-item-popup',
    template: ''
})
export class CommentBlogItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentBlogItemPopupService: CommentBlogItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commentBlogItemPopupService
                    .open(CommentBlogItemDialogComponent as Component, params['id']);
            } else {
                this.commentBlogItemPopupService
                    .open(CommentBlogItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
