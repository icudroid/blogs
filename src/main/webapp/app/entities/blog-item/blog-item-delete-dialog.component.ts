import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BlogItem } from './blog-item.model';
import { BlogItemPopupService } from './blog-item-popup.service';
import { BlogItemService } from './blog-item.service';

@Component({
    selector: 'jhi-blog-item-delete-dialog',
    templateUrl: './blog-item-delete-dialog.component.html'
})
export class BlogItemDeleteDialogComponent {

    blogItem: BlogItem;

    constructor(
        private blogItemService: BlogItemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.blogItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'blogItemListModification',
                content: 'Deleted an blogItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-blog-item-delete-popup',
    template: ''
})
export class BlogItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private blogItemPopupService: BlogItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.blogItemPopupService
                .open(BlogItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
