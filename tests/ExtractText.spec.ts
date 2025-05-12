import {test, expect} from '@playwright/test'
import { beforeEach } from 'node:test';

test.beforeEach(async({page})=>{
    await page.goto("http://localhost:4200/pages");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
});
test('Extract button text', async({page})=>{

    //Extract text from Submit button
    const buttonText = await page.locator('nb-card').filter({hasText:"Basic form"}).locator('button').textContent();
    await console.log(buttonText); 
    expect(buttonText).toContain("Submit");
});

test('Extract text from all Radio buttons', async({page})=>{
    const radioButtonText = await page.locator("nb-radio").allTextContents();
    await console.log(radioButtonText);
    expect(radioButtonText).toContain("Option 1");
});

test.only('Extract text from input value', async({page})=>{

    const emailFieldLocator = await page.locator("nb-card").
    filter({hasText:'Basic form'}).getByRole('textbox',{name:'Email'});

    await emailFieldLocator.fill("test@test.com");

    const emailFieldValue = await emailFieldLocator.inputValue();
    expect(emailFieldValue).toContain("test");
});
