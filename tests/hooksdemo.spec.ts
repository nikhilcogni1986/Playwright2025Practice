import {test} from '@playwright/test'

test.beforeEach(async({page})=>
{
    await page.goto("http://localhost:4200/pages/iot-dashboard")
})
test.describe(()=>
{
    test.beforeEach(async({page})=>
    {
        await page.getByText("Forms").click();
    })

    test('Navigate to forms page', async({page})=>{
        await page.getByText("Form Layouts").click();
    })
});

test.describe(()=>
{
    test.beforeEach(async({page})=>
    {
        await page.getByText("Forms").click();
    })

    test('Navigate to Date Picker page', async({page})=>{
        await page.getByText("Datepicker").click();
    })
});