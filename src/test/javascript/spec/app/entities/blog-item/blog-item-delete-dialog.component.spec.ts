/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BlogsTestModule } from '../../../test.module';
import { BlogItemDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/blog-item/blog-item-delete-dialog.component';
import { BlogItemService } from '../../../../../../main/webapp/app/entities/blog-item/blog-item.service';

describe('Component Tests', () => {

    describe('BlogItem Management Delete Component', () => {
        let comp: BlogItemDeleteDialogComponent;
        let fixture: ComponentFixture<BlogItemDeleteDialogComponent>;
        let service: BlogItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogsTestModule],
                declarations: [BlogItemDeleteDialogComponent],
                providers: [
                    BlogItemService
                ]
            })
            .overrideTemplate(BlogItemDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlogItemDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlogItemService);
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
