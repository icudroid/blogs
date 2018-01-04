import {Component, Input} from '@angular/core';
import {CommentBlogItem} from "../../../entities/comment-blog-item";
import {CommentWithAuthorModel} from "../../../entities/comment-blog-item/comment-with-author.model";
import {Principal} from "../../../shared";

@Component({
    selector: 'jhi-comment',
    template: `
        <div class="media">
            <a class="pull-left" href="#">
                <img class="media-object" [src]="getImageUrl()" alt="">
            </a>
            <div class="media-body">
                <div class="media-heading">
                    <a>{{commentBlogItem.author.login}}</a> <span class="divider">|</span> <span
                    class="light-gray">{{commentBlogItem.created | timeAgo}}</span>
                </div>
                <p>{{commentBlogItem.text}}</p>
                <div class="media-footer">
                    <a *ngIf="principal.isAuthenticated() && !showCommentBloc" (click)="showComment()">
                        <i class="fa fa-reply"></i> Répondre
                    </a>
                    <a *ngIf="principal.isAuthenticated() && showCommentBloc" (click)="showComment()">
                        Annuler
                    </a>
                </div>
                <jhi-leave-comment [blogItemId]="commentBlogItem.blogItemId" [replyTo]="commentBlogItem.id"
                                   *ngIf="showCommentBloc"></jhi-leave-comment>
                <jhi-comment *ngFor="let comment of commentBlogItem.replies" [commentBlogItem]="comment"></jhi-comment>
            </div>


        </div>
    `,
    styles: [
            `.media {
            margin-top: 0px;
        }

        jhi-comment > .media {
            margin-top: 30px;
        }

        .media-object {
            max-width: 60px;
            border-radius: 50px;
        }

        .media-footer, .media-footer a {
            display: inline-block;
            color: #9e9e9e;
            font-size: 12px;
            line-height: 1em;
        }

        .media-footer a:hover {
            color: #ffcd38;
        }

        .light-gray {
            color: #9e9e9e;
            font-size: 12px;
        }

        .media-heading a {
            color: #2eca7f;
            text-decoration: none;
            outline: none;
            -webkit-transition: all 0.3s ease-in-out;
            -moz-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            -ms-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
            font-size: 14px;
        }
        `
    ]

})
export class CommentComponent {
    @Input()
    commentBlogItem: CommentWithAuthorModel;

    private showCommentBloc: boolean;

    constructor(private principal: Principal) {
        this.showCommentBloc = false;
    }

    showComment() {
        this.showCommentBloc = !this.showCommentBloc;
    }

    getImageUrl() {
        return /*this.commentBlogItem.author.imageUrl ||*/ "/assets/images/logo-jhipster.png";
    }
}
