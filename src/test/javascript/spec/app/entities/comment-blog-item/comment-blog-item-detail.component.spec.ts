/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BlogsTestModule } from '../../../test.module';
import { CommentBlogItemDetailComponent } from '../../../../../../main/webapp/app/entities/comment-blog-item/comment-blog-item-detail.component';
import { CommentBlogItemService } from '../../../../../../main/webapp/app/entities/comment-blog-item/comment-blog-item.service';
import { CommentBlogItem } from '../../../../../../main/webapp/app/entities/comment-blog-item/comment-blog-item.model';

describe('Component Tests', () => {

    describe('CommentBlogItem Management Detail Component', () => {
        let comp: CommentBlogItemDetailComponent;
        let fixture: ComponentFixture<CommentBlogItemDetailComponent>;
        let service: CommentBlogItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogsTestModule],
                declarations: [CommentBlogItemDetailComponent],
                providers: [
                    CommentBlogItemService
                ]
            })
            .overrideTemplate(CommentBlogItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentBlogItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentBlogItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CommentBlogItem(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.commentBlogItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
