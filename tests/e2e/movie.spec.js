const { test, expect } = require('../support');
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

    const movie = data.filme.guerra_mundial_z;
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.create(movie);
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('Web - nao deve cadastrar um filme que ja existe', async ({ page,request }) => {

    const movie = data.filme.a_noite_dos_mortos_vivos;

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.create(movie);
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
    await page.getByRole('button',{name:'Ok'}).click();
    await page.movie.create(movie);
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('API - nao deve cadastrar um filme que ja existe', async ({ page,request }) => {
  
    const movie = data.filme.resident_evil_o_hospedeiro;

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);

    await request.moviesApi.createMovie(movie);
    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.create(movie);
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('nao deve permitir criar filme sem preencher campos obrigatórios', async ({page})=>{
    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.goForm();
    await page.movie.submit();
    await page.alert.haveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'])
})

test('WEB - deve remover um filme', async ({page,request})=>{
    const movie = data.filme.exterminio;
    await request.moviesApi.createMovie(movie);
    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.delete(movie);
    await page.popup.haveText('Filme removido com sucesso.');
})

test('API - deve remover um filme', async ({page,request})=>{
    const movie = data.filme.exterminio;
    await request.moviesApi.createMovie(movie);
    await request.moviesApi.deleteMovie(movie);
})