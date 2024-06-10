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
const { Login } = require('./actions/Login');
const { Movie } = require('./actions/Movie')
const { Lead } = require('./actions/Lead');
const { Toast, Alert } = require('./actions/Components');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;

        context['lead'] = new Lead(page);
        context['login'] = new Login(page);
        context['movie'] = new Movie(page);
        context['toast'] = new Toast(page);
        context['alert'] = new Alert(page);

        await use(context);
    }
})


export { test, expect };