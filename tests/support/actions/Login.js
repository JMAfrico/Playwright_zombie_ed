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
   }

   async submit(email, senha) {
      console.log("Realizando login");

      await this.page.getByPlaceholder('E-mail').fill(email);
      await this.page.getByPlaceholder('Senha').fill(senha);
      await this.page.getByText('Entrar').click();

   }

   async alertHaveText(text) {
      //esse é um locator css onde o $ significa que termina com
      console.log("Validando mensagem de alerta");
      const alert = this.page.locator('span[class$=alert]')
      await expect(alert).toHaveText(text);
   }

   async isLoggedIn() {
      console.log("Verificando se está logado");
      //Aguarda todo o network ser carregado pra seguir o teste
      await this.page.waitForLoadState('networkidle');
      //await expect(this.page).toHaveURL('http://localhost:3000/admin/movies');
      await expect(this.page).toHaveURL(/.*movies/);
      const logedUser = this.page.locator('.logged-user');
      await expect(logedUser).toContainText('Olá,');
   }
}