const { expect } = require('@playwright/test');

export class Lead {

    constructor(page){
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000/');
    }

    async openLeadModal() {
        await this.page.getByRole("button", { name: 'Aperte o play... se tiver coragem' }).click();
        await expect(this.page.getByTestId('modal')
            .getByRole('heading'))
            .toHaveText('Fila de espera');
    }

    async submitFormLead(nome,email) {
        await this.page.getByPlaceholder("Informe seu nome").fill(nome);
        await this.page.locator('#email').fill(email);
        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click();
    }




}