//ESSA IMPLEMENTAÇÃO É EXATAMENTE COMO O page dentro dos arquivos de teste funcionam
//Porém iremos sobreescrever o page original, onde iremos injetar dentro da classe page
//todos os PageObjects, e nao vou precisar criar eles dentro das classes PageObject

const {test: base,expect} = require('@playwright/test');

const {LoginPage} = require('../pages/LoginPage');
const {MoviesPage} = require('../pages/MoviesPage')
const {LandingPage} = require('../pages/LandingPage');
const {Toast, Alert} = require('../pages/Components');

const test = base.extend({
    page: async ({page}, use) =>{
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page),
            alert: new Alert(page)    
        })
    }
})

export {test,expect};