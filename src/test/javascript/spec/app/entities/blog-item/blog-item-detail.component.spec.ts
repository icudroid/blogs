/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { BlogsTestModule } from '../../../test.module';
import { BlogItemDetailComponent } from '../../../../../../main/webapp/app/entities/blog-item/blog-item-detail.component';
import { BlogItemService } from '../../../../../../main/webapp/app/entities/blog-item/blog-item.service';
import { BlogItem } from '../../../../../../main/webapp/app/entities/blog-item/blog-item.model';

describe('Component Tests', () => {

    describe('BlogItem Management Detail Component', () => {
        let comp: BlogItemDetailComponent;
        let fixture: ComponentFixture<BlogItemDetailComponent>;
        let service: BlogItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogsTestModule],
                declarations: [BlogItemDetailComponent],
                providers: [
                    BlogItemService
                ]
            })
            .overrideTemplate(BlogItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BlogItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BlogItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BlogItem(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.blogItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
