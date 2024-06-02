const {expect} = require ('@playwright/test');

export class Toast{

    constructor(page){
        this.page = page;
    }

    async haveText(message) {
        const toast = this.page.locator('.toast')
        await expect(toast).toHaveText(message);
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