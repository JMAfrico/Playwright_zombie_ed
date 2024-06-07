const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {Toast} = require('../pages/Components');
const {MoviesPage} = require('../pages/MoviesPage')

let loginPage;
let toast;
let moviesPage;

test.beforeEach(({page})=>{
    loginPage = new LoginPage(page);
    toast = new Toast(page);
    moviesPage = new MoviesPage(page);
});

test('deve logar como adm', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com','pwd123');
    await moviesPage.isLoggedIn();
  });

  test('nao deve logar com senha errada', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com','123123');

    const msg = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await toast.haveText(msg)
  });

  test('nao deve logar quando o email é invalido', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('www.teste.abc','123123');
    await loginPage.alertHaveText('Email incorreto');
  });

  test('nao deve logar quando o email nao e preenchido', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('','123123');
    await loginPage.alertHaveText('Campo obrigatório');
  });

  test('nao deve logar quando a senha nao e preenchida', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('joao@hotmail.com','');
    await loginPage.alertHaveText('Campo obrigatório');
  });

  test('nao deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('','');
    await loginPage.alertHaveText(['Campo obrigatório','Campo obrigatório']);
  });