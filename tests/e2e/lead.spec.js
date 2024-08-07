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




