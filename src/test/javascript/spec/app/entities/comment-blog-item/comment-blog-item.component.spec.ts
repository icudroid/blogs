/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BlogsTestModule } from '../../../test.module';
import { CommentBlogItemComponent } from '../../../../../../main/webapp/app/entities/comment-blog-item/comment-blog-item.component';
import { CommentBlogItemService } from '../../../../../../main/webapp/app/entities/comment-blog-item/comment-blog-item.service';
import { CommentBlogItem } from '../../../../../../main/webapp/app/entities/comment-blog-item/comment-blog-item.model';

describe('Component Tests', () => {

    describe('CommentBlogItem Management Component', () => {
        let comp: CommentBlogItemComponent;
        let fixture: ComponentFixture<CommentBlogItemComponent>;
        let service: CommentBlogItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogsTestModule],
                declarations: [CommentBlogItemComponent],
                providers: [
                    CommentBlogItemService
                ]
            })
            .overrideTemplate(CommentBlogItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentBlogItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentBlogItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CommentBlogItem(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.commentBlogItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
