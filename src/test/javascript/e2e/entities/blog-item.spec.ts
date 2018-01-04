import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('BlogItem e2e test', () => {

    let navBarPage: NavBarPage;
    let blogItemDialogPage: BlogItemDialogPage;
    let blogItemComponentsPage: BlogItemComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load BlogItems', () => {
        navBarPage.goToEntity('blog-item');
        blogItemComponentsPage = new BlogItemComponentsPage();
        expect(blogItemComponentsPage.getTitle()).toMatch(/blogsApp.blogItem.home.title/);

    });

    it('should load create BlogItem dialog', () => {
        blogItemComponentsPage.clickOnCreateButton();
        blogItemDialogPage = new BlogItemDialogPage();
        expect(blogItemDialogPage.getModalTitle()).toMatch(/blogsApp.blogItem.home.createOrEditLabel/);
        blogItemDialogPage.close();
    });

    it('should create and save BlogItems', () => {
        blogItemComponentsPage.clickOnCreateButton();
        blogItemDialogPage.setTitleInput('title');
        expect(blogItemDialogPage.getTitleInput()).toMatch('title');
        blogItemDialogPage.setTextInput('text');
        expect(blogItemDialogPage.getTextInput()).toMatch('text');
        blogItemDialogPage.setCreatedInput(12310020012301);
        expect(blogItemDialogPage.getCreatedInput()).toMatch('2001-12-31T02:30');
        blogItemDialogPage.setUpdatedInput(12310020012301);
        expect(blogItemDialogPage.getUpdatedInput()).toMatch('2001-12-31T02:30');
        blogItemDialogPage.setImageInput(absolutePath);
        blogItemDialogPage.blogSelectLastOption();
        blogItemDialogPage.authorSelectLastOption();
        // blogItemDialogPage.tagsSelectLastOption();
        blogItemDialogPage.save();
        expect(blogItemDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BlogItemComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-blog-item div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BlogItemDialogPage {
    modalTitle = element(by.css('h4#myBlogItemLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    textInput = element(by.css('textarea#field_text'));
    createdInput = element(by.css('input#field_created'));
    updatedInput = element(by.css('input#field_updated'));
    imageInput = element(by.css('input#file_image'));
    blogSelect = element(by.css('select#field_blog'));
    authorSelect = element(by.css('select#field_author'));
    tagsSelect = element(by.css('select#field_tags'));

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

    setImageInput = function(image) {
        this.imageInput.sendKeys(image);
    }

    getImageInput = function() {
        return this.imageInput.getAttribute('value');
    }

    blogSelectLastOption = function() {
        this.blogSelect.all(by.tagName('option')).last().click();
    }

    blogSelectOption = function(option) {
        this.blogSelect.sendKeys(option);
    }

    getBlogSelect = function() {
        return this.blogSelect;
    }

    getBlogSelectedOption = function() {
        return this.blogSelect.element(by.css('option:checked')).getText();
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

    tagsSelectLastOption = function() {
        this.tagsSelect.all(by.tagName('option')).last().click();
    }

    tagsSelectOption = function(option) {
        this.tagsSelect.sendKeys(option);
    }

    getTagsSelect = function() {
        return this.tagsSelect;
    }

    getTagsSelectedOption = function() {
        return this.tagsSelect.element(by.css('option:checked')).getText();
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
