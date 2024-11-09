import { Page } from 'playwright';

export class BasePage {
    constructor(public page: Page) {}

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async type(selector: string, text: string) {
        await this.page.fill(selector, text);
    }

    async getText(selector: string) {
        return this.page.textContent(selector);
    }

    async getElementsText(selector: string) {
        return this.page.$$eval(selector, elements => elements.map(el => el.textContent));
    }

    async getElementByText(text: string){
        return this.page.getByText(text);
    }
}
