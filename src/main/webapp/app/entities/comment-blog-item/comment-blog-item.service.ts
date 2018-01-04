import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CommentBlogItem } from './comment-blog-item.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {CommentWithAuthorModel} from "./comment-with-author.model";

@Injectable()
export class CommentBlogItemService {

    private resourceUrl = SERVER_API_URL + 'api/comment-blog-items';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/comment-blog-items';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(commentBlogItem: CommentBlogItem): Observable<CommentBlogItem> {
        const copy = this.convert(commentBlogItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(commentBlogItem: CommentBlogItem): Observable<CommentBlogItem> {
        const copy = this.convert(commentBlogItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CommentBlogItem> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }


    findAddByBlogItem(idBlogItem:number): Observable<ResponseWrapper> {
        const options = createRequestOption();
        return this.http.get(`/api/blog-items/${idBlogItem}/comments`, options)
            .map((res: any) => this.convertResponseWithAuthor(res));
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }


    private convertResponseWithAuthor(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServertWithAuthorModel(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to CommentBlogItem.
     */
    private convertItemFromServer(json: any): CommentBlogItem {
        const entity: CommentBlogItem = Object.assign(new CommentBlogItem(), json);
        entity.created = this.dateUtils
            .convertDateTimeFromServer(json.created);
        entity.updated = this.dateUtils
            .convertDateTimeFromServer(json.updated);
        return entity;
    }



    private convertItemFromServertWithAuthorModel(json: any): CommentWithAuthorModel {
        const entity: CommentWithAuthorModel = Object.assign(new CommentWithAuthorModel(), json);
        entity.created = this.dateUtils
            .convertDateTimeFromServer(json.created);
        entity.updated = this.dateUtils
            .convertDateTimeFromServer(json.updated);
        return entity;
    }

    /**
     * Convert a CommentBlogItem to a JSON which can be sent to the server.
     */
    private convert(commentBlogItem: CommentBlogItem): CommentBlogItem {
        const copy: CommentBlogItem = Object.assign({}, commentBlogItem);

        copy.created = this.dateUtils.toDate(commentBlogItem.created);

        copy.updated = this.dateUtils.toDate(commentBlogItem.updated);
        return copy;
    }

}
