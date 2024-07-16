const { expect } = require('@playwright/test');

export class Lead {

    constructor(page){
        this.page = page;
    }

    async visit() {
        this.page.on('console', msg => console.log(msg.text() +" : Acessando a página"));
        await this.page.goto('/');
    }

    async openLeadModal() {
/*         this.page.on('console', msg => {
            if(msg.type()== "error"){
                console.log(msg.text())
            }
            console.log(msg.text());
        }) */
        this.page.on('console', msg => console.log(msg.text() +" : Abrindo modal"));    
        await this.page.getByRole("button", { name: 'Aperte o play... se tiver coragem' }).click();
        await expect(this.page.getByTestId('modal')
            .getByRole('heading'))
            .toHaveText('Fila de espera');
    }

    async submitFormLead(nome,email) {
        this.page.on('console', msg => console.log(msg.text() +" : Preenchendo formulário formulario"));
        await this.page.getByPlaceholder("Informe seu nome").fill(nome);
        await this.page.locator('#email').fill(email);
        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click();
    }
}