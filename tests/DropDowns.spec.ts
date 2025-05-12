import { test, expect } from '@playwright/test'

test.beforeEach(async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
});

test("Select a country from the drop down using visible text", async({page})=>
{
    const dropdownList = page.locator("#country option")
    const options = await dropdownList.count(); 
    console.log(options);
    expect(options).toBe(10);

    //get the options from the drop down
    for(let i=0; i<options; i++)
    {
        const optionValue = (await dropdownList.nth(i).innerText()).trim();
        console.log(optionValue);
    };

    //get the options from the drop down using for Each loop
    const drpdwnArray = await page.locator("#country option").allTextContents();
    drpdwnArray.forEach((optionValue) => {
        console.log(optionValue.trim());
    });
});

test("Select a country by label", async({page})=>{
    const dropdpwn = page.locator("#country");
    await dropdpwn.selectOption({label: "India"});
})

test("Select a country by value", async({page})=>{
    const dropdpwn = page.locator("#country");
    await dropdpwn.selectOption({value: "brazil"});
})

test("Select a country by Index", async({page})=>{
    const dropdpwn = page.locator("#country");
    await dropdpwn.selectOption({index: 2});
})

test("Select a color from the drop down", async({page})=>{
    
    //select a color from the drop down
    await page.getByLabel('Colors:').selectOption('red');
    await page.getByLabel('Colors:').selectOption('green');

    const drpdwnList = await page.getByLabel('Colors:').locator('option').allTextContents();
    console.log(drpdwnList.length);
    drpdwnList.forEach((optionValue)=>
    {
        console.log(optionValue.trim());
    })
})




