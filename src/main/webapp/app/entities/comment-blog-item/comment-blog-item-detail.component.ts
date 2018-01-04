import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CommentBlogItem } from './comment-blog-item.model';
import { CommentBlogItemService } from './comment-blog-item.service';

@Component({
    selector: 'jhi-comment-blog-item-detail',
    templateUrl: './comment-blog-item-detail.component.html'
})
export class CommentBlogItemDetailComponent implements OnInit, OnDestroy {

    commentBlogItem: CommentBlogItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private commentBlogItemService: CommentBlogItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCommentBlogItems();
    }

    load(id) {
        this.commentBlogItemService.find(id).subscribe((commentBlogItem) => {
            this.commentBlogItem = commentBlogItem;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCommentBlogItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commentBlogItemListModification',
            (response) => this.load(this.commentBlogItem.id)
        );
    }
}
