/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BlogsTestModule } from '../../../test.module';
import { CommentBlogItemDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/comment-blog-item/comment-blog-item-delete-dialog.component';
import { CommentBlogItemService } from '../../../../../../main/webapp/app/entities/comment-blog-item/comment-blog-item.service';

describe('Component Tests', () => {

    describe('CommentBlogItem Management Delete Component', () => {
        let comp: CommentBlogItemDeleteDialogComponent;
        let fixture: ComponentFixture<CommentBlogItemDeleteDialogComponent>;
        let service: CommentBlogItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogsTestModule],
                declarations: [CommentBlogItemDeleteDialogComponent],
                providers: [
                    CommentBlogItemService
                ]
            })
            .overrideTemplate(CommentBlogItemDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentBlogItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentBlogItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
