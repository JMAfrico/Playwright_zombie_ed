const { test } = require('../support');
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
    await page.toast.haveText('Cadastro realizado com sucesso')
})

test('nao deve cadastrar um filme que ja existe', async ({ page }) => {

    const movie = data.filme.resident_evil_o_hospedeiro;
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.create(movie);
    await page.toast.haveText('Cadastro realizado com sucesso')
    await page.movie.create(movie);
    await page.toast.haveText('Este conteúdo já encontra-se cadastrado no catálogo')
})
test('nao deve permitir criar filme sem preencher campos obrigatórios', async ({page})=>{
    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.goForm();
    await page.movie.submit();
    await page.alert.haveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'])
})