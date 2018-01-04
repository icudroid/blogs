import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Tag e2e test', () => {

    let navBarPage: NavBarPage;
    let tagDialogPage: TagDialogPage;
    let tagComponentsPage: TagComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tags', () => {
        navBarPage.goToEntity('tag');
        tagComponentsPage = new TagComponentsPage();
        expect(tagComponentsPage.getTitle()).toMatch(/blogsApp.tag.home.title/);

    });

    it('should load create Tag dialog', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage = new TagDialogPage();
        expect(tagDialogPage.getModalTitle()).toMatch(/blogsApp.tag.home.createOrEditLabel/);
        tagDialogPage.close();
    });

    it('should create and save Tags', () => {
        tagComponentsPage.clickOnCreateButton();
        tagDialogPage.setTagNameInput('tagName');
        expect(tagDialogPage.getTagNameInput()).toMatch('tagName');
        tagDialogPage.save();
        expect(tagDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TagComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tag div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TagDialogPage {
    modalTitle = element(by.css('h4#myTagLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    tagNameInput = element(by.css('input#field_tagName'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTagNameInput = function(tagName) {
        this.tagNameInput.sendKeys(tagName);
    }

    getTagNameInput = function() {
        return this.tagNameInput.getAttribute('value');
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
