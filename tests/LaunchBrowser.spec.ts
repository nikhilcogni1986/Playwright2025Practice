import {test} from '@playwright/test'

test('Launch the Demo App', async({page})=>{
    await page.goto("http://localhost:4200/pages/iot-dashboard");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
});

test('Launch Demo Blaze App', async({page})=>{
    await page.goto("https://demoblaze.com/");
    await page.locator("#login2").click()
    await page.locator("#loginusername").fill("nikhilrao@test.com");
    await page.locator("#loginpassword").fill("Password1234");
})