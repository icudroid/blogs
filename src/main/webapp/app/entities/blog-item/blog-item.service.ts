import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {BlogItem} from './blog-item.model';
import {ResponseWrapper, createRequestOption} from '../../shared';

@Injectable()
export class BlogItemService {

    private resourceUrl = SERVER_API_URL + 'api/blog-items';
    private resourceFindByBlogNameUrl = SERVER_API_URL + 'api/blogs/{blogName}/blog-items';
    private resourceFindByBlogNameAndTagnameUrl = SERVER_API_URL + '/api/blogs/{blogName}/blog-items/tag/{tagName}';

    private resourceSearchUrl = SERVER_API_URL + 'api/_search/blog-items';

    constructor(private http: Http, private dateUtils: JhiDateUtils) {
    }

    create(blogItem: BlogItem): Observable<BlogItem> {
        const copy = this.convert(blogItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(blogItem: BlogItem): Observable<BlogItem> {
        const copy = this.convert(blogItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BlogItem> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryByBlogName(blogName: string, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceFindByBlogNameUrl.split('{blogName}').join(blogName), options)
            .map((res: Response) => this.convertResponse(res));
    }

    queryByBlogNameAndTagName(blogName: string, tagname: string, req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(
            this.resourceFindByBlogNameAndTagnameUrl.split('{blogName}').join(blogName)
                .split('{tagName}').join(tagname)
            , options)
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

    searchByBlogName(blogName: string, req?: any) {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl + '/' + blogName, options)
            .map((res: any) => this.convertResponse(res));
    }

    searchByBlogNameAndTagName(blogName: string, tagName: string, req?: any) {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl + '/' + blogName + '/tag/' + tagName, options)
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

    /**
     * Convert a returned JSON object to BlogItem.
     */
    private convertItemFromServer(json: any): BlogItem {
        const entity: BlogItem = Object.assign(new BlogItem(), json);
        entity.created = this.dateUtils
            .convertDateTimeFromServer(json.created);
        entity.updated = this.dateUtils
            .convertDateTimeFromServer(json.updated);
        return entity;
    }

    /**
     * Convert a BlogItem to a JSON which can be sent to the server.
     */
    private convert(blogItem: BlogItem): BlogItem {
        const copy: BlogItem = Object.assign({}, blogItem);

        copy.created = this.dateUtils.toDate(blogItem.created);

        copy.updated = this.dateUtils.toDate(blogItem.updated);
        return copy;
    }
}
