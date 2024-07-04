const { test, expect } = require('../support');
const { executeSQL } = require('../support/database');
const { faker } = require('@faker-js/faker');

test('API - Deve cadastrar um novo lead',async({request})=>{
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();

    await request.leadApi.createLead(randomName, randomEmail);
});

test('API - Tentativa de cadastrar um lead ja cadastrado', async ({ page, request }) => {
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();

    await request.leadApi.createLead(randomName, randomEmail);
    await page.lead.visit();
    await page.lead.openLeadModal();
    await page.lead.submitFormLead(randomName, randomEmail);
    const msg = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
    await page.popup.haveText(msg);
});

test('API - Deve deletar um lead',async({request})=>{
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();

    await request.leadApi.createLead(randomName, randomEmail);
    await request.leadApi.deleteLead(randomEmail);
});