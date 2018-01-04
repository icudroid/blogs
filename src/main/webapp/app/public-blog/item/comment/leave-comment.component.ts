import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {UserService} from '../../../shared/index';
import {Response} from "@angular/http";
import {CommentBlogItem, CommentBlogItemService} from "../../../entities/comment-blog-item";

@Component({
    selector: 'jhi-leave-comment',
    template: `
        <div class="post-comment-add">
            <div class="block-title">
                <h3>Laisser un commentaire</h3>
            </div>
            <form class="form-add-comment" name="editForm" role="form" novalidate (ngSubmit)="save()"
                  #editForm="ngForm">
                <div class="form-group">
                    <label class="form-control-label" jhiTranslate="blogsApp.commentBlogItem.text"
                           for="field_text">Text</label>
                    <input type="text" class="form-control" name="text" id="field_text"
                           [(ngModel)]="commentBlogItem.text" required minlength="3" maxlength="512"/>
                    <div [hidden]="!(editForm.controls.text?.dirty && editForm.controls.text?.invalid)">
                        <small class="form-text text-danger"
                               [hidden]="!editForm.controls.text?.errors?.required"
                               jhiTranslate="entity.validation.required">
                            This field is required.
                        </small>
                        <small class="form-text text-danger"
                               [hidden]="!editForm.controls.text?.errors?.minlength"
                               jhiTranslate="entity.validation.minlength" translateValues="{ min: 3 }">
                            This field is required to be at least 3 characters.
                        </small>
                        <small class="form-text text-danger"
                               [hidden]="!editForm.controls.text?.errors?.maxlength"
                               jhiTranslate="entity.validation.maxlength" translateValues="{ max: 512 }">
                            This field cannot be longer than 512 characters.
                        </small>
                    </div>
                </div>
                <!--                <div class="form-group form-group-with-icon">
                                    <i class="fa fa-comment"></i>
                                    <label>Message</label>
                                    <textarea class="form-control" placeholder="" name="message"></textarea>
                                    <div class="form-control-border"></div>
                                </div>-->
                <button class="btn btn-info" type="submit">Ajouter son commentaire</button>
            </form>
        </div>
    `,

    styles: [
            `

            .post-comment-add {
                margin-bottom: 15px;
            }

            .block-title {
                margin: 40px 0 10px;
            }

            .block-title h3 {
                font-size: 21px;
                margin: 5px 0 25px;
            }



        `
    ]
})
export class LeaveCommentComponent implements OnInit {


    @Input()
    set replyTo(id: number) {
        this.commentBlogItem.commentBlogItemId = id;
    }

    @Input()
    set blogItemId(id: number) {
        this.commentBlogItem.blogItemId = id;
    }

    commentBlogItem: CommentBlogItem;
    isSaving: boolean;

    constructor(private jhiAlertService: JhiAlertService,
                private commentBlogItemService: CommentBlogItemService,
                private userService: UserService,
                private eventManager: JhiEventManager) {
        this.commentBlogItem = new CommentBlogItem();
    }

    ngOnInit() {
        this.isSaving = false;

    }

    save() {
        this.isSaving = true;
        if (this.commentBlogItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentBlogItemService.update(this.commentBlogItem));
        } else {
            this.subscribeToSaveResponse(
                this.commentBlogItemService.create(this.commentBlogItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<CommentBlogItem>) {
        result.subscribe((res: CommentBlogItem) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CommentBlogItem) {
        this.eventManager.broadcast({name: 'commentBlogItemListModification', content: 'OK'});
        this.isSaving = false;
        // Todo :
        this.commentBlogItem = new CommentBlogItem();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
