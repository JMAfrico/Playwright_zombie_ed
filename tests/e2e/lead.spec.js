//const { test, expect } = require('@playwright/test');
const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('Lead com email invalido', async ({ page }) => {
  await page.lead.visit();
  await page.lead.openLeadModal();
  await page.lead.submitFormLead('João Marcos', 'joao_marcossilvahotmail.com');
  const labelEmailIncorreto = 'Email incorreto';
  await page.alert.haveText(labelEmailIncorreto);

});

test('Lead com dado nome vazio', async ({ page }) => {
  await page.lead.visit();
  await page.lead.openLeadModal();
  await page.lead.submitFormLead('', 'joao_marcossilva@hotmail.com');
  const labelmsg = 'Campo obrigatório';
  await page.alert.haveText(labelmsg)
});

test('Lead com dado email vazio', async ({ page }) => {
  await page.lead.visit();
  await page.lead.openLeadModal();
  await page.lead.submitFormLead('João Marcos','');
  const labelmsg = 'Campo obrigatório';
  await page.alert.haveText(labelmsg)

});

test('Lead com dados vazios', async ({ page }) => {
  await page.lead.visit();
  await page.lead.openLeadModal();
  await page.lead.submitFormLead('', '');
  const labelmsg= 'Campo obrigatório';
  await page.alert.haveText([
    labelmsg,
    labelmsg]);
});

test('Adicionar um lead com sucesso', async ({ page }) => {
  //import de faker: npm i @faker-js/faker
  //https://fakerjs.dev/guide/usage.html
  const randomName = faker.person.fullName(); 
  const randomEmail = faker.internet.email();

  await page.lead.visit();
  await page.lead.openLeadModal();
  await page.lead.submitFormLead(randomName, randomEmail);
  const msg = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(msg)
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
  
  await page.lead.visit();
  await page.lead.openLeadModal();
  await page.lead.submitFormLead(randomName, randomEmail);
  const msg = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(msg)
});


