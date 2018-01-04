import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { BlogItem } from './blog-item.model';
import { BlogItemService } from './blog-item.service';

@Injectable()
export class BlogItemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private blogItemService: BlogItemService

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
                this.blogItemService.find(id).subscribe((blogItem) => {
                    blogItem.created = this.datePipe
                        .transform(blogItem.created, 'yyyy-MM-ddTHH:mm:ss');
                    blogItem.updated = this.datePipe
                        .transform(blogItem.updated, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.blogItemModalRef(component, blogItem);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.blogItemModalRef(component, new BlogItem());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    blogItemModalRef(component: Component, blogItem: BlogItem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.blogItem = blogItem;
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
