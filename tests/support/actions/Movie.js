const { expect } = require('@playwright/test');
//const data = require('../support/fixtures/movies.json');

export class Movie {

   constructor(page) {
      this.page = page;
   }

   /*  async isLoggedIn(){
        ----Aguarda todo o network ser carregado pra seguir o teste---
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL('http://localhost:3000/admin/movies');
        await expect(this.page).toHaveURL(/.*movies/);
      }*/

   async goForm() {
      console.log("Acessando Formulario de Filmes");
      /* : ^ começa com, * contem, $ termina com. */
      await this.page.locator("a[href$='register']").click();
   }

   async submit() {
      /*botao cadastrar*/
      console.log("Clicar em Botao Enviar");
      await this.page.getByRole('button', { name: 'Cadastrar' }).click();
   }

   async setTitle(movie) {
      console.log("Preencher Titulo do Filme");
      /*getByLabel buscar atravez da label pai propriedade html "for" 
      e vai navegando internamente até o input e preenche (se conter o mesmo nome no input)*/
      await this.page.getByLabel("Titulo do filme").fill(movie.title);
   }

   async setOverview(movie) {
      console.log("Preenche sinopse do Filme");
      await this.page.locator("#overview").fill(movie.overview);
   }

   async selectCompany(movie) {
      console.log("Seleciona a produtora do Filme");
      /*Select Company*/
      await this.page.locator('#select_company_id .react-select__indicator').click();
      /*navega até o elemento select, filtra por texto com hastext*/
      await this.page.locator('.react-select__option').filter({ hasText: movie.company }).click();
   }

   async selectYear(movie) {
      console.log("Seleciona o ano do Filme");
      await this.page.locator('#select_year .react-select__indicator').click();
      await this.page.locator('.react-select__option').filter({ hasText: movie.release_year }).click();
   }

   async setCover(movie) {
      console.log("Seleciona a capa do Filme");
      await this.page.locator("input[name='cover']").setInputFiles('tests/support/fixtures' + movie.cover);
   }

   async setFeature(movie) {
      console.log("Seleciona conteudo destaque");
      /*conteudo destaque que aparece na home
      verifica se a marcação de movie.featured é verdadeira, se sim clica no botão*/
      if (movie.featured) {
         await this.page.locator('.featured .react-switch').click();
      }
   }

   async create(movie) {
      await this.goForm();
      await this.setTitle(movie);
      await this.setOverview(movie);
      await this.selectCompany(movie);
      await this.selectYear(movie);
      await this.setCover(movie);
      await this.setFeature(movie);
      await this.submit();
   }

   async delete(movie) {
      console.log("Clica em Deletar Filme");
      await this.page.getByRole('row', { name: movie.title }).getByRole('button').click();
      await this.page.click('.confirm-removal');
   }
}