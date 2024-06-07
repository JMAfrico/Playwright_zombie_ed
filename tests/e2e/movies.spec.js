//const { test, expect } = require('@playwright/test');
const { test } = require('../support')
const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/database');

test('(sem contexto)deve cadastrar um novo filme', async ({ page }) => {

    /*const movie = data.guerra_mundial_z;
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com','pwd123');
    await moviesPage.isLoggedIn();
    await moviesPage.create(movie.title,movie.overview,movie.company,movie.release_year);
    await toast.haveText('Cadastro realizado com sucesso')*/
})

test('deve cadastrar um novo filme', async ({ page }) => {

    const movie = data.guerra_mundial_z;
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.visit();
    await page.login.submit('admin@zombieplus.com', 'pwd123');
    await page.movies.isLoggedIn();
    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year);
    await page.toast.haveText('Cadastro realizado com sucesso')
})