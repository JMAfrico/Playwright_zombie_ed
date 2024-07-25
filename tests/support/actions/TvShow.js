const { expect } = require('@playwright/test');

export class TvShow {

    constructor(page) {
        this.page = page
    }

    async goMenu() {
        console.log("Acessando Menu de Séries");

        await this.page.locator("a[href$='tvshows']").click();
    }
    async goForm() {
        console.log("Acessando Formulario de Séries");
        /* : ^ começa com, * contem, $ termina com. */
        await this.page.locator("a[href$='register']").click();
    }

    async setTitle(){
        console.log("Digitando nome da série");

        await this.page.getByLabel('Titulo da série').fill('Teste');
    }


}