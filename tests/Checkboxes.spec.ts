import {test, expect} from '@playwright/test'

test('Checkboxes demo', async ({ page }) => 
{
    await page.goto("http://localhost:4200/pages/iot-dashboard");
    await page.getByText("Modal & Overlays").click();
    await page.getByText("Toastr").click();

    //uncheck the checkbox Hide on click
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });
    expect(await page.getByRole('checkbox', { name: 'Hide on click' }).isChecked()).toBeFalsy();

    //check the checkbox Prevent duplicates
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true });
    expect(await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).isChecked()).toBeTruthy();
});

test('Select all Checkboxes demo', async ({ page }) => 
    {
        await page.goto("https://training.rcvacademy.com/test-automation-practice-page");
        
        //Select all checkboxes
        const checkboxes = page.getByRole('checkbox');
        const checkboxesCount = await checkboxes.count();
        for (let i = 0; i < checkboxesCount; i++) 
        {
            //Check each checkbox
            await checkboxes.nth(i).check({ force: true });
            expect(await checkboxes.nth(i).isChecked()).toBeTruthy();
        }

        await page.getByText('Selenium with Java').check({ force: true });
        expect(await page.getByText('Selenium with Java').isChecked()).toBeTruthy();

    });
    
