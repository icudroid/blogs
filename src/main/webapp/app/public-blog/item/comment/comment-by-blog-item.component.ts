import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {JhiEventManager, JhiParseLinks, JhiAlertService} from 'ng-jhipster';

import {ITEMS_PER_PAGE, Principal, ResponseWrapper} from '../../../shared/index';
import {CommentBlogItem, CommentBlogItemService} from "../../../entities/comment-blog-item";
import {CommentWithAuthorModel} from "../../../entities/comment-blog-item/comment-with-author.model";

@Component({
    selector: 'jhi-comment-by-blog-item',
    template: `
        <div class="post-comments">
            <div class="block-title">
                <h3>Commentaires ({{totalItems}})</h3>
            </div>

            <ng-container *ngFor="let comment of commentBlogItems">
                <jhi-comment *ngIf="comment.commentBlogItemId == null" [commentBlogItem]="comment"></jhi-comment>
            </ng-container>

        </div>
    `,
    styles: [
            `
            .block-title {
                margin: 40px 0 10px;
            }

            .block-title h3 {
                font-size: 21px;
                margin: 5px 0 25px;
            }

            .post-comments .media-object {
                max-width: 60px;
                border-radius: 50px;
            }
        `

    ]
})
export class CommentByBlogItemComponent implements OnInit, OnDestroy {


    @Input() blogItemId: number;

    commentBlogItems: CommentWithAuthorModel[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;
    currentSearch: string;

    constructor(private commentBlogItemService: CommentBlogItemService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private parseLinks: JhiParseLinks,
                private activatedRoute: ActivatedRoute,
                private principal: Principal) {
        this.commentBlogItems = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        ///blog-items/{id}/comments
        this.commentBlogItemService.findAddByBlogItem(this.blogItemId).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    reset() {
        this.page = 0;
        this.commentBlogItems = [];
        this.loadAll();
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    clear() {
        this.commentBlogItems = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = 'id';
        this.reverse = true;
        this.currentSearch = '';
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.commentBlogItems = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = '_score';
        this.reverse = false;
        this.currentSearch = query;
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCommentBlogItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CommentBlogItem) {
        return item.id;
    }

    registerChangeInCommentBlogItems() {
        this.eventSubscriber = this.eventManager.subscribe('commentBlogItemListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.commentBlogItems.push(data[i]);
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
