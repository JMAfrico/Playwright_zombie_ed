/*Esse arquivo representa o page dentro dos arquivos de teste 

/*const test = base.extend({
    page: async ({page}, use) =>{
        await use(page)
    }
})

Porém iremos criar uma extensão do page original, onde iremos injetar dentro da classe page
todos os PageObjects, e nao vou precisar criar eles dentro das classes PageObject*/

/*Import dos arquivos Page*/
const { test: base, expect } = require('@playwright/test');
const { Login } = require('./actions/Login');
const { Movie } = require('./actions/Movie')
const { Lead } = require('./actions/Lead');
const { Toast, Alert , Popup} = require('./actions/Components');
const { Api } = require('./api/index')
const {MoviesApi} = require('./api/movies_api')
const {LeadApi} = require('./api/lead_api')
const {TvShow} = require('./actions/TvShow');

/*Criação de instância (extensão) dos arquivos Page*/
const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;
        context['lead'] = new Lead(page);
        context['login'] = new Login(page);
        context['movie'] = new Movie(page);
        context['toast'] = new Toast(page);
        context['alert'] = new Alert(page);
        context['popup'] = new Popup(page);
        context['tvshow'] = new TvShow(page);
        await use(context);
    },

    request: async({request},use)=>{
        const context = request;
        context['api'] = new Api(request);
        context['moviesApi'] = new MoviesApi(request);
        context['leadApi'] = new LeadApi(request);
        await use(context);
    }
})
export { test, expect };