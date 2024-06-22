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
    await page.toast.haveText('Cadastro realizado com sucesso')
})

test('Web - nao deve cadastrar um filme que ja existe', async ({ page,request }) => {

    const movie = data.filme.a_noite_dos_mortos_vivos;

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.create(movie);
    await page.toast.haveText('Cadastro realizado com sucesso');
    await page.movie.create(movie);
    await page.toast.haveText('Este conteúdo já encontra-se cadastrado no catálogo')
})

test('API - nao deve cadastrar um filme que ja existe', async ({ page,request }) => {
  
    /*Captura de token
    //Fazer request post na rota sessions, passando o body que esta em 'data'
    const response = await request.post('http://localhost:3333/sessions',{
        data:{
            email:'admin@zombieplus.com',
            password: 'pwd123'
        }
    })

    //Analisar o response da request
    //se é da familia 200(ok)
    expect(response.ok()).toBeTruthy();

    // mostra todo o payload da resposta em texto
    console.log(await response.text()) 
    
    //Função parse para converter o formato texto do body para formato Json
    const body = JSON.parse(await response.text());
    console.log(body);

    console.log(body.token)
    const token = body.token;*/

    const movie = data.filme.resident_evil_o_hospedeiro;

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);

    await request.api.createMovie(movie);
    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.create(movie);
    await page.toast.haveText('Este conteúdo já encontra-se cadastrado no catálogo');
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