// @ts-check
const { test, expect } = require('@playwright/test');
const {LandingPage} = require('../pages/LandingPage');
const {Toast, Alert} = require('../pages/Components');
const { faker } = require('@faker-js/faker');

let landingPage;
let toast;
let alert;

//before each executa 1 vez para cada cenario
//before all executa 1 vez por execução
test.beforeEach(({page})=>{
  landingPage = new LandingPage(page);
  toast = new Toast(page);
  alert = new Alert(page);
})
test.skip('TESTE 1', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  /*PESQUISA E CLICA
  Selenium
  //await page.click("//button[text()='Aperte o play... se tiver coragem']")*/

  //Playwright - PESQUISA POR REGRA
  await page.getByRole("button", {name: 'Aperte o play... se tiver coragem'}).click();

  //EXPRESSÃO REGULAR, PESQUISA CONTEM O TEXTO 
  //await page.getByRole("button", {name: /Aperte o play/ }).click();
  
  //PAGE LOCATOR É UM TIPO DE PESQUISA MAIS GENERICO, FUNCIONA PRA TUDO(aqui pela classe)
  //await page.locator('#name').fill('João Marcos');

  //VALIDAÇÃO DE MODAL, COM O TITULO HEAD FILA DE ESPERA
   await expect(page
    .getByTestId('modal')
    .getByRole('heading'))
    .toHaveText('Fila de espera')

  //PESQUISA POR PLACEHOLDER
  await page.getByPlaceholder("Informe seu nome").fill('João Marcos');
  await page.locator('#email').fill('joao_marcossilva@hotmail.com');

  //PESQUISA BOTÃO POR TEXTO
  //selenium
  //await page.locator("//button[text()='Quero entrar na fila!']").click();

  //playwright(naveguei no pai modal e fui até o filho texto)
  await page.getByTestId('modal').getByText('Quero entrar na fila!').click();

  /*
  O ELEMENTO A SEGUIR APARECE RAPIDAMENTE, NAO TEM TEMPO DE CAPTURAR O HTML
  VAMOS FAZER UM ESQUEMA PARA CAPTURAR O HTML NO MOMENTO, 
  await page.content() armazena o código html, passamos pra variavel e no console.log
  capturamos no console do npx playwright test --ui;
  
  await page.getByText("seus dados conosco").click();
  const content = await page.content();
  console.log(content);*/

  const validacao = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator(".toast")).toHaveText(validacao);

  //A mensagem acima aparece e some, então vamos fazer a 
  //validação que o toast que aparece tem que sumir em ate 5 seg
  await expect(page.locator('.toast')).toBeHidden({timeout:5000});
  
  //Espera o tempo a seguir para mandar o comando
  await page.waitForTimeout(10000);

  //Aguarda todo o network ser carregado pra seguir o teste
  await page.waitForLoadState('networkidle');
});

test.skip('TESTE 2', async ({ page }) => {
  //visit
  await page.goto('http://localhost:3000/');

  //OpenLeadModal
  await page.getByRole("button", {name: 'Aperte o play... se tiver coragem'}).click();

   await expect(page.getByTestId('modal')
    .getByRole('heading'))
    .toHaveText('Fila de espera');

  //SubmitFormLead
  await page.getByPlaceholder("Informe seu nome").fill('João Marcos');
  await page.locator('#email').fill('joao_marcossilva@hotmail.com');

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click();

  //toastHaveText 
  const validacao = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await expect(page.locator(".toast")).toHaveText(validacao);
  await expect(page.locator('.toast')).toBeHidden({timeout:5000});

});

test('Lead com email invalido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitFormLead('João Marcos', 'joao_marcossilvahotmail.com');
  const labelEmailIncorreto = 'Email incorreto';
  await alert.haveText(labelEmailIncorreto);

});

test('Lead com dado nome vazio', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitFormLead('', 'joao_marcossilva@hotmail.com');
  const labelmsg = 'Campo obrigatório';
  await alert.haveText(labelmsg)
});
test('Lead com dado email vazio', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitFormLead('João Marcos','');
  const labelmsg = 'Campo obrigatório';
  await alert.haveText(labelmsg)

});

test('Lead com dados vazios', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitFormLead('', '');
  const labelmsg= 'Campo obrigatório';
  await alert.haveText([
    labelmsg,
    labelmsg]);
});

test('Adicionar um lead', async ({ page }) => {
  //import de faker: npm i @faker-js/faker
  //https://fakerjs.dev/guide/usage.html
  const randomName = faker.person.fullName(); 
  const randomEmail = faker.internet.email();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitFormLead(randomName, randomEmail);
  const msg = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(msg)
});

test('Tentativa de cadastrar um lead ja cadastrado', async ({ page, request }) => {
  const randomName = faker.person.fullName(); 
  const randomEmail = faker.internet.email();

  //adicionar request no argumento
  //chamar o request.post
  //adicionar numa constante
  //verificar o resultado esperado ok(familia 200)
  const newLead = await request.post('http://localhost:3333/leads',{
    data:{
      name: randomName, 
      email: randomEmail
    }
  })

  await expect(newLead.ok()).toBeTruthy();
  
  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitFormLead(randomName, randomEmail);
  const msg = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.haveText(msg)
});


