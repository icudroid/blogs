import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommentBlogItem } from './comment-blog-item.model';
import { CommentBlogItemPopupService } from './comment-blog-item-popup.service';
import { CommentBlogItemService } from './comment-blog-item.service';

@Component({
    selector: 'jhi-comment-blog-item-delete-dialog',
    templateUrl: './comment-blog-item-delete-dialog.component.html'
})
export class CommentBlogItemDeleteDialogComponent {

    commentBlogItem: CommentBlogItem;

    constructor(
        private commentBlogItemService: CommentBlogItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentBlogItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commentBlogItemListModification',
                content: 'Deleted an commentBlogItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comment-blog-item-delete-popup',
    template: ''
})
export class CommentBlogItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentBlogItemPopupService: CommentBlogItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commentBlogItemPopupService
                .open(CommentBlogItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
