import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Blog e2e test', () => {

    let navBarPage: NavBarPage;
    let blogDialogPage: BlogDialogPage;
    let blogComponentsPage: BlogComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Blogs', () => {
        navBarPage.goToEntity('blog');
        blogComponentsPage = new BlogComponentsPage();
        expect(blogComponentsPage.getTitle()).toMatch(/blogsApp.blog.home.title/);

    });

    it('should load create Blog dialog', () => {
        blogComponentsPage.clickOnCreateButton();
        blogDialogPage = new BlogDialogPage();
        expect(blogDialogPage.getModalTitle()).toMatch(/blogsApp.blog.home.createOrEditLabel/);
        blogDialogPage.close();
    });

    it('should create and save Blogs', () => {
        blogComponentsPage.clickOnCreateButton();
        blogDialogPage.setTitleInput('title');
        expect(blogDialogPage.getTitleInput()).toMatch('title');
        blogDialogPage.setSubtitleInput('subtitle');
        expect(blogDialogPage.getSubtitleInput()).toMatch('subtitle');
        blogDialogPage.setDescritpionInput('descritpion');
        expect(blogDialogPage.getDescritpionInput()).toMatch('descritpion');
        blogDialogPage.setImageInput(absolutePath);
        blogDialogPage.authorSelectLastOption();
        blogDialogPage.save();
        expect(blogDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BlogComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-blog div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BlogDialogPage {
    modalTitle = element(by.css('h4#myBlogLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    subtitleInput = element(by.css('input#field_subtitle'));
    descritpionInput = element(by.css('input#field_descritpion'));
    imageInput = element(by.css('input#file_image'));
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

    setSubtitleInput = function(subtitle) {
        this.subtitleInput.sendKeys(subtitle);
    }

    getSubtitleInput = function() {
        return this.subtitleInput.getAttribute('value');
    }

    setDescritpionInput = function(descritpion) {
        this.descritpionInput.sendKeys(descritpion);
    }

    getDescritpionInput = function() {
        return this.descritpionInput.getAttribute('value');
    }

    setImageInput = function(image) {
        this.imageInput.sendKeys(image);
    }

    getImageInput = function() {
        return this.imageInput.getAttribute('value');
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
