const {expect} = require('@playwright/test');

export class LoginPage {

     constructor(page){
        this.page = page;
     }

     async visit(){
        await this.page.goto('http://localhost:3000/admin/login');

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible();
     }

     async submit(email, senha){
        await this.page.getByPlaceholder('E-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(senha);
        await this.page.getByText('Entrar').click();
        
     }



     async alertHaveText(text){
      //esse é um locator css onde o $ significa que
      const alert = this.page.locator('span[class$=alert]')
      await expect(alert).toHaveText(text);
     }
}