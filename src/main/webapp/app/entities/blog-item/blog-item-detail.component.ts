import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { BlogItem } from './blog-item.model';
import { BlogItemService } from './blog-item.service';

@Component({
    selector: 'jhi-blog-item-detail',
    templateUrl: './blog-item-detail.component.html'
})
export class BlogItemDetailComponent implements OnInit, OnDestroy {

    blogItem: BlogItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private blogItemService: BlogItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBlogItems();
    }

    load(id) {
        this.blogItemService.find(id).subscribe((blogItem) => {
            this.blogItem = blogItem;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBlogItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'blogItemListModification',
            (response) => this.load(this.blogItem.id)
        );
    }
}
