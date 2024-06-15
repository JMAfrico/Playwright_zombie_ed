const {expect} = require('@playwright/test');
//const data = require('../support/fixtures/movies.json');

export class Movie{

    constructor(page){
        this.page = page;
    }

   //  async isLoggedIn(){
   //      //Aguarda todo o network ser carregado pra seguir o teste
   //      await this.page.waitForLoadState('networkidle');
   //      //await expect(this.page).toHaveURL('http://localhost:3000/admin/movies');
   //      await expect(this.page).toHaveURL(/.*movies/);
   //   }

     async goForm(){
        //^ começa com, * contem, $ termina com
        await this.page.locator("a[href$='register']").click();
     }

     async submit(){
        //botao cadastrar
        await this.page.getByRole('button', {name: 'Cadastrar'}).click();
     }

     async create(movie){

        await this.goForm();
        //Title
        //getByLabel buscar atravez da label pai propriedade "for" 
        //e vai navegando internamente até o input e preenche (se conter o mesmo nome no input)
        await this.page.getByLabel("Titulo do filme").fill(movie.title);

        //OverView
        await this.page.locator("#overview").fill(movie.overview);

        //Select Company
        await this.page.locator('#select_company_id .react-select__indicator')
        .click();

        //navega até o elemento select, filtra por texto com hastext
        await this.page.locator('.react-select__option')
        .filter({hasText: movie.company})
        .click();

        //Select Year
        await this.page.locator('#select_year .react-select__indicator')
        .click();

        //navega até o elemento select, filtra por texto com hastext
        await this.page.locator('.react-select__option')
        .filter({hasText: movie.release_year})
        .click();

        await this.page.locator("input[name='cover']")
        .setInputFiles('tests/support/fixtures'+movie.cover);
        
        await this.submit();
        
     }
}