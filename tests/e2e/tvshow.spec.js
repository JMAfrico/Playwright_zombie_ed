const { test, expect} = require('../support');

test('Cadastrar nova série', async({page}) => {
    await page.login.logar('admin@zombieplus.com', 'pwd123');
    await page.tvshow.goMenu();
    await page.tvshow.goForm();
    await page.tvshow.setTitle();
});