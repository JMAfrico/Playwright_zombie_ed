//const { test, expect } = require('@playwright/test');
const { test, expect} = require('../support');

test('deve logar como adm', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com','pwd123');
    await page.login.isLoggedIn();
  });

  test('nao deve logar com senha errada', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('admin@zombieplus.com','123123');

    const msg = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.popup.haveText(msg)
  });

  test('nao deve logar quando o email é invalido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('www.teste.abc','123123');
    await page.login.alertHaveText('Email incorreto');
  });

  test('nao deve logar quando o email nao e preenchido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('','123123');
    await page.login.alertHaveText('Campo obrigatório');
  });

  test('nao deve logar quando a senha nao e preenchida', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('joao@hotmail.com','');
    await page.login.alertHaveText('Campo obrigatório');
  });

  test('nao deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await page.login.visit();
    await page.login.submit('','');
    await page.login.alertHaveText(['Campo obrigatório','Campo obrigatório']);
  });