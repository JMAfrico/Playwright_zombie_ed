const {expect} = require ('@playwright/test');

export class Toast{

    constructor(page){
        this.page = page;
    }

    async haveText(message) {
        const toast = this.page.locator('.toast')
        await expect(toast).toContainText(message);
        await expect(toast).toBeHidden({ timeout: 10000 });

    }
}

export class Alert{

    constructor(page){
        this.page = page;
    }

    async haveText(message){
        await expect(this.page.locator('.alert')).toHaveText(message);
    }
}

export class Popup{

    constructor(page){
        this.page = page;
    }

    async haveText(message){
        const element = await this.page.locator('.swal2-html-container')
        await expect(element).toHaveText(message);
    }
}