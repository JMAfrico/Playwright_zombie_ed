const { test, expect } = require('../support');
const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/database');

test('API - deve buscar um filme', async ({request})=>{
    const movie = data.filme.resident_evil_o_hospedeiro;
    await request.moviesApi.getMovie(movie.title);
})

test('API - deve cadastrar um filme', async ({request})=>{
    const movie = data.filme.zumbilandia;
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);
    await request.moviesApi.createMovie(movie);
})

test('API - nao deve cadastrar um filme que ja existe', async ({ page,request }) => {
  
    const movie = data.filme.resident_evil_o_hospedeiro;

    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);
    
    await request.moviesApi.createMovie(movie);
    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.movie.create(movie);
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('API - deve remover um filme', async ({request})=>{
    const movie = data.filme.exterminio;
    await request.moviesApi.createMovie(movie);
    await request.moviesApi.deleteMovie(movie);
})