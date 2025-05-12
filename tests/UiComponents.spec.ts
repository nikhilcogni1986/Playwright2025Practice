import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/pages/iot-dashboard")
})
test.describe("Launch the Application", () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText("Forms").click();
        await page.getByText("Form Layouts").click();
    });

    test("Enter a value in input field", async ({ page }) => {
        //Enter a value in input field
        const emailField = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" });
        await emailField.fill("test2@test.com")
        await emailField.clear();
        await emailField.pressSequentially("test2@test.com", { delay: 500 });

        //Assertion
        const inputValue = await emailField.inputValue();
        expect(inputValue).toEqual("test2@test.com");

        //locator assertion
        await expect(emailField).toHaveValue("test2@test.com");
    });

    test('Drop down demo', async ({ page }) => {
        await page.goto("http://localhost:4200/pages/iot-dashboard");
        const dropDown = page.locator(" ngx-header nb-select");
        await dropDown.click();
    
        const dropdownList = page.locator("nb-option-list nb-option");
      
        const trimmedTexts = await dropdownList.allTextContents().then(items => items.map(item => item.trim()));
        expect(trimmedTexts).toEqual(["Dark", "Light", "Cosmic", "Corporate"]);
        
    });
})