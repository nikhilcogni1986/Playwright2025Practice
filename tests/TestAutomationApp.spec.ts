import {test, expect} from '@playwright/test';

test('Handling text boxes', async ({ page }) =>
{
    await page.goto("https://testautomationpractice.blogspot.com/");
    expect(await page.locator("h1.title").textContent()).toContain("Automation Testing Practice");

    //Enter first, last, address, email, and phone number in the text boxes
    await page.getByPlaceholder("Enter Name").clear();
    await page.getByPlaceholder("Enter Name").fill("Ramesh");

    await page.getByPlaceholder("Enter EMail").clear();
    await page.getByPlaceholder("Enter EMail").fill("Rameshtest@test.com");

    await page.getByPlaceholder("Enter Phone").clear();
    await page.getByPlaceholder("Enter Phone").fill("1234567890");

    await page.locator("#textarea").clear();
    await page.locator("#textarea").fill("This is a test message");

    await page.getByRole("radio",{name: 'Male',exact:true}).check();
    await page.getByRole("checkbox",{name: 'sunday'}).check();
    await page.getByRole("checkbox",{name: 'monday'}).check();
    await page.getByRole("checkbox",{name: 'tuesday'}).check();
    await page.getByRole("checkbox",{name: 'wednesday'}).check();

    //Select a Date from the date picker
    await page.locator("#datepicker").click();
    await page.locator(".ui-datepicker-calendar").getByText("20",{exact:true}).click();
    await page.locator("#datepicker").press("Enter");
    expect(await page.locator("#datepicker").inputValue()).toBe("04/20/2025");
    await page.waitForTimeout(2000);

    //Select a date from the date picker using the date picker input field
    await page.locator("#txtDate").click();
    await page.locator(".ui-datepicker-calendar").getByText("20",{exact:true}).click();
    await page.locator("#datepicker").press("Enter");
    expect(await page.locator("#txtDate").inputValue()).toBe("20/04/2025");
    await page.waitForTimeout(2000);
});