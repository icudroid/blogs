import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('CommentBlogItem e2e test', () => {

    let navBarPage: NavBarPage;
    let commentBlogItemDialogPage: CommentBlogItemDialogPage;
    let commentBlogItemComponentsPage: CommentBlogItemComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CommentBlogItems', () => {
        navBarPage.goToEntity('comment-blog-item');
        commentBlogItemComponentsPage = new CommentBlogItemComponentsPage();
        expect(commentBlogItemComponentsPage.getTitle()).toMatch(/blogsApp.commentBlogItem.home.title/);

    });

    it('should load create CommentBlogItem dialog', () => {
        commentBlogItemComponentsPage.clickOnCreateButton();
        commentBlogItemDialogPage = new CommentBlogItemDialogPage();
        expect(commentBlogItemDialogPage.getModalTitle()).toMatch(/blogsApp.commentBlogItem.home.createOrEditLabel/);
        commentBlogItemDialogPage.close();
    });

    it('should create and save CommentBlogItems', () => {
        commentBlogItemComponentsPage.clickOnCreateButton();
        commentBlogItemDialogPage.setTitleInput('title');
        expect(commentBlogItemDialogPage.getTitleInput()).toMatch('title');
        commentBlogItemDialogPage.setTextInput('text');
        expect(commentBlogItemDialogPage.getTextInput()).toMatch('text');
        commentBlogItemDialogPage.setCreatedInput(12310020012301);
        expect(commentBlogItemDialogPage.getCreatedInput()).toMatch('2001-12-31T02:30');
        commentBlogItemDialogPage.setUpdatedInput(12310020012301);
        expect(commentBlogItemDialogPage.getUpdatedInput()).toMatch('2001-12-31T02:30');
        commentBlogItemDialogPage.statusSelectLastOption();
        commentBlogItemDialogPage.blogItemSelectLastOption();
        commentBlogItemDialogPage.commentBlogItemSelectLastOption();
        commentBlogItemDialogPage.authorSelectLastOption();
        commentBlogItemDialogPage.save();
        expect(commentBlogItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CommentBlogItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-comment-blog-item div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CommentBlogItemDialogPage {
    modalTitle = element(by.css('h4#myCommentBlogItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    textInput = element(by.css('input#field_text'));
    createdInput = element(by.css('input#field_created'));
    updatedInput = element(by.css('input#field_updated'));
    statusSelect = element(by.css('select#field_status'));
    blogItemSelect = element(by.css('select#field_blogItem'));
    commentBlogItemSelect = element(by.css('select#field_commentBlogItem'));
    authorSelect = element(by.css('select#field_author'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    }

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    }

    setTextInput = function(text) {
        this.textInput.sendKeys(text);
    }

    getTextInput = function() {
        return this.textInput.getAttribute('value');
    }

    setCreatedInput = function(created) {
        this.createdInput.sendKeys(created);
    }

    getCreatedInput = function() {
        return this.createdInput.getAttribute('value');
    }

    setUpdatedInput = function(updated) {
        this.updatedInput.sendKeys(updated);
    }

    getUpdatedInput = function() {
        return this.updatedInput.getAttribute('value');
    }

    setStatusSelect = function(status) {
        this.statusSelect.sendKeys(status);
    }

    getStatusSelect = function() {
        return this.statusSelect.element(by.css('option:checked')).getText();
    }

    statusSelectLastOption = function() {
        this.statusSelect.all(by.tagName('option')).last().click();
    }
    blogItemSelectLastOption = function() {
        this.blogItemSelect.all(by.tagName('option')).last().click();
    }

    blogItemSelectOption = function(option) {
        this.blogItemSelect.sendKeys(option);
    }

    getBlogItemSelect = function() {
        return this.blogItemSelect;
    }

    getBlogItemSelectedOption = function() {
        return this.blogItemSelect.element(by.css('option:checked')).getText();
    }

    commentBlogItemSelectLastOption = function() {
        this.commentBlogItemSelect.all(by.tagName('option')).last().click();
    }

    commentBlogItemSelectOption = function(option) {
        this.commentBlogItemSelect.sendKeys(option);
    }

    getCommentBlogItemSelect = function() {
        return this.commentBlogItemSelect;
    }

    getCommentBlogItemSelectedOption = function() {
        return this.commentBlogItemSelect.element(by.css('option:checked')).getText();
    }

    authorSelectLastOption = function() {
        this.authorSelect.all(by.tagName('option')).last().click();
    }

    authorSelectOption = function(option) {
        this.authorSelect.sendKeys(option);
    }

    getAuthorSelect = function() {
        return this.authorSelect;
    }

    getAuthorSelectedOption = function() {
        return this.authorSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
