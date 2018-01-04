import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CommentBlogItem } from './comment-blog-item.model';
import { CommentBlogItemService } from './comment-blog-item.service';

@Injectable()
export class CommentBlogItemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private commentBlogItemService: CommentBlogItemService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.commentBlogItemService.find(id).subscribe((commentBlogItem) => {
                    commentBlogItem.created = this.datePipe
                        .transform(commentBlogItem.created, 'yyyy-MM-ddTHH:mm:ss');
                    commentBlogItem.updated = this.datePipe
                        .transform(commentBlogItem.updated, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.commentBlogItemModalRef(component, commentBlogItem);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.commentBlogItemModalRef(component, new CommentBlogItem());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    commentBlogItemModalRef(component: Component, commentBlogItem: CommentBlogItem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.commentBlogItem = commentBlogItem;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
