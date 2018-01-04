/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { BlogsTestModule } from '../../../test.module';
import { BlogItemComponent } from '../../../../../../main/webapp/app/entities/blog-item/blog-item.component';
import { BlogItemService } from '../../../../../../main/webapp/app/entities/blog-item/blog-item.service';
import { BlogItem } from '../../../../../../main/webapp/app/entities/blog-item/blog-item.model';

describe('Component Tests', () => {

    describe('BlogItem Management Component', () => {
        let comp: BlogItemComponent;
        let fixture: ComponentFixture<BlogItemComponent>;
        let service: BlogItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogsTestModule],
                declarations: [BlogItemComponent],
                providers: [
                    BlogItemService
                ]
            })
            .overrideTemplate(BlogItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlogItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlogItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new BlogItem(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.blogItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
