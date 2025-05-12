import {test} from '@playwright/test'

test('Use of locators', async({page})=>{
  await page.goto("http://localhost:4200/pages/forms/layouts");
  await page.getByRole('textbox',{name:'Email'}).first().click();
  await page.getByRole('textbox', { name: 'Jane Doe' }).fill("Playwright test");
  await page.getByText('Remember me').first().click();
});

test('Child locators', async({page})=>{
  await page.goto("http://localhost:4200/pages/forms/layouts");
  await page.locator('#inputEmail1').fill("nikhilrao@test.com");
  await page.locator('#inputPassword2').fill("Password");
});

 test('Parent locators', async({page})=>{
  await page.goto("http://localhost:4200/pages/forms/layouts");
  await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox',{name:'Email'}).fill("nikhil@test.com")
  await page.locator('nb-card',{hasText: 'Using the Grid'}).getByRole('textbox',{name:'Password'}).fill("Password");

  //Another option to identify the email and password in Basic form
  await page.locator('nb-card').filter({hasText:'Basic form'}).getByRole('textbox',{name:'Email'}).fill("email@test.com");
  await page.locator('#exampleInputPassword1').fill("Password");

  await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'}).
    getByRole('textbox',{name:'Email'}).fill("Nikhil@test.com");

  await page.locator(':text-is("Using the Grid")').locator("..")
    .getByRole('textbox',{name:'Email'}).fill("nikhil@test.com");

 })