/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { BlogsTestModule } from '../../../test.module';
import { BlogItemDialogComponent } from '../../../../../../main/webapp/app/entities/blog-item/blog-item-dialog.component';
import { BlogItemService } from '../../../../../../main/webapp/app/entities/blog-item/blog-item.service';
import { BlogItem } from '../../../../../../main/webapp/app/entities/blog-item/blog-item.model';
import { BlogService } from '../../../../../../main/webapp/app/entities/blog';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { TagService } from '../../../../../../main/webapp/app/entities/tag';

describe('Component Tests', () => {

    describe('BlogItem Management Dialog Component', () => {
        let comp: BlogItemDialogComponent;
        let fixture: ComponentFixture<BlogItemDialogComponent>;
        let service: BlogItemService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogsTestModule],
                declarations: [BlogItemDialogComponent],
                providers: [
                    BlogService,
                    UserService,
                    TagService,
                    BlogItemService
                ]
            })
            .overrideTemplate(BlogItemDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlogItemDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlogItemService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BlogItem(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.blogItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'blogItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BlogItem();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.blogItem = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'blogItemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
