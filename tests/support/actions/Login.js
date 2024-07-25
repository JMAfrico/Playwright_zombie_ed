const { expect } = require('@playwright/test');

export class Login {

   constructor(page) {
      this.page = page;
   }

   async logar(email, senha) {
      await this.visit();
      await this.submit(email, senha);
      await this.isLoggedIn();
   }

   async visit() {
      console.log("Acessando a página de Login");
      
      await this.page.goto('/admin/login');
      const loginForm = this.page.locator('.login-form')
      await expect(loginForm).toBeVisible();

      await this.page.screenshot({path: 'test-result/Pagina de Login.png', fullPage:true});
   }

   async submit(email, senha) {
      console.log("Realizando login");

      //Print só do email
      const eemail = await this.page.getByPlaceholder('E-mail');
      eemail.screenshot({path: 'test-result/SoEmail.png'});

      await this.page.getByPlaceholder('E-mail').fill(email)
      await this.page.screenshot({path: 'test-result/Email.png', fullpPge:true});

      await this.page.getByPlaceholder('Senha').fill(senha);
      await this.page.screenshot({path: 'test-result/Senha.png', fullPage:true});

      await this.page.getByText('Entrar').click();
   }

   async alertHaveText(text) {
      //esse é um locator css onde o $ significa que termina com
      console.log("Validando mensagem de alerta");

      const alert = this.page.locator('span[class$=alert]')
      await expect(alert).toHaveText(text);

      await this.page.screenshot({path: 'test-result/Alerta.png', fullPage:true});
   }

   async isLoggedIn() {
      console.log("Verificando se está logado");

      //Aguarda todo o network ser carregado pra seguir o teste
      await this.page.waitForLoadState('networkidle');
      //await expect(this.page).toHaveURL('http://localhost:3000/admin/movies');
      await expect(this.page).toHaveURL(/.*movies/);
      const logedUser = this.page.locator('.logged-user');
      await expect(logedUser).toContainText('Olá,');

      await this.page.screenshot({path: 'test-result/Login sucesso.png', fullPage:true});
   }
}