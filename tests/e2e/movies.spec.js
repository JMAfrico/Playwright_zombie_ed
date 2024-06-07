const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {Toast} = require('../pages/Components');
const {MoviesPage} = require('../pages/MoviesPage')
const data = require('../support/fixtures/movies.json');
const {executeSQL} = require('../support/database');

let loginPage;
let toast;
let moviesPage;

test.beforeEach(({page})=>{
    loginPage = new LoginPage(page);
    toast = new Toast(page);
    moviesPage = new MoviesPage(page);
});
test('deve cadastrar um novo filme',async ({page})=>{
    const movie = data.guerra_mundial_z;
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com','pwd123');
    await moviesPage.isLoggedIn();
    await moviesPage.create(movie.title,movie.overview,movie.company,movie.release_year);
    await toast.haveText('Cadastro realizado com sucesso')
})