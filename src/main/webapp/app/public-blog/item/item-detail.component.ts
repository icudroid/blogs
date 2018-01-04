import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import {BlogItem, BlogItemService} from "../../entities/blog-item";
import {Author, LoginModalService, User, UserService} from "../../shared";
import {Principal} from "../../shared/auth/principal.service";
import {Blog, BlogService} from "../../entities/blog";
import {NgbModalRef} from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'jhi-item-detail',
    templateUrl: './item-detail.component.html',
    styles : [
        `
            blog-content {
                padding: 50px;
            }

            .blog-post-content {
                position: relative;
                background-color: #fff;
                padding: 30px;
                margin: -50px 40px 0;
            }

            .entry-meta {
                color: #9e9e9e;
                margin: 20px 0 30px;
            }

            .entry-meta a {
                color: #9e9e9e;
            }

            .entry-meta a:hover {
                color: #F4511E;
            }

            a {
                color: #2eca7f;
                text-decoration: none;
                outline: none;
                -webkit-transition: all 0.3s ease-in-out;
                -moz-transition: all 0.3s ease-in-out;
                -o-transition: all 0.3s ease-in-out;
                -ms-transition: all 0.3s ease-in-out;
                transition: all 0.3s ease-in-out;
            }

            .entry-meta a {
                font-weight: normal;
                font-size: 15px;
                line-height: 1.6em;
            }

            .entry-meta.entry-tags-share {
                display: inline-block;
                width: 100%;
                background-color: #fafafa;
                padding: 5px 10px;
                margin: 30px 0 0;
            }

            .entry-meta.entry-tags-share .share-buttons {
                display: inline-block;
                margin: 0;
            }

            .entry-meta.entry-tags-share .share-buttons a:hover {
                color: #fff;
            }

            .entry-meta.entry-tags-share .post-info span {
                display: inline-block;
                padding: 5px 0;
                line-height: 1em;
            }

            .tags-block {
                margin: 25px 0 0;
            }

            .tags {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .tags li {
                display: inline-block;
                margin: 2px 5px;
            }

            .tags li a {
                font-size: 13px;
                color: #757575;
                padding: 3px 8px;
                background-color: #eee;
                border-radius: 3px;
            }

            .share-buttons {
                margin: 25px 0 0;
            }

            .share-buttons a {
                display: inline-block;
                margin: 0 5px 0 0;
                padding: 0;
                width: 28px;
                height: 28px;
                color: #9e9e9e;
                background-color: #fff;
                border: 1px solid #e0e0e0;
                border-radius: 0;
                text-align: center;
            }

            .share-buttons a:hover {
                color: #fff;
                background-color: #2eca7f;
                border-color: transparent;
            }

            .share-buttons a:last-child {
                margin-right: 0;
            }

            .share-buttons a i {
                font-size: 14px;
                line-height: 26px;
            }

        `
    ]
})
export class ItemDetailComponent implements OnInit, OnDestroy {

    blogItem: BlogItem;
    blog: Blog;
    author: Author;
    ownBlog:boolean;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private blogItemService: BlogItemService,
        private blogService: BlogService,
        private userService: UserService,
        private principal : Principal,
        private route: ActivatedRoute,
        private router: Router,
        private loginModalService: LoginModalService,
    ) {
        this.ownBlog = false;
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBlogItems();
    }

    load(id) {
        this.blogItemService.find(id).subscribe((blogItem) => {
            this.blogItem = blogItem;

            this.blogService.find(this.blogItem.blogId).subscribe((blog)=>{
                this.blog = blog;
            });

            this.userService.findById(this.blogItem.authorId).subscribe((author)=>{
                this.author = author;
                this.principal.identity().then((id) => {
                    this.ownBlog =  id.login == this.author.login;
                }, () => {
                    this.ownBlog = false;
                });

            });

        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    previousState() {
        if(this.ownBlog){
            window.history.back();
        }else{
            this.router.navigate(['/public-blog',this.blog.title]);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBlogItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'blogItemListModification',
            (response) => this.load(this.blogItem.id)
        );
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
