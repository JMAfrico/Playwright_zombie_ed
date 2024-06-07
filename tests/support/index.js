//ESSA IMPLEMENTAÇÃO É EXATAMENTE COMO O page dentro dos arquivos de teste funcionam
//Porém iremos criar uma extensão do page original, onde iremos injetar dentro da classe page
//todos os PageObjects, e nao vou precisar criar eles dentro das classes PageObject

//ORIGINAL PAGE 
/*const test = base.extend({
    page: async ({page}, use) =>{
        await use(page)
    }
})*/

const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { MoviesPage } = require('../pages/MoviesPage')
const { LandingPage } = require('../pages/LandingPage');
const { Toast, Alert } = require('../pages/Components');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;

        context['landing'] = new LandingPage(page);
        context['login'] = new LoginPage(page);
        context['movies'] = new MoviesPage(page);
        context['toast'] = new Toast(page);
        context['alert'] = new Alert(page);

        await use(context);
    }
})


export { test, expect };