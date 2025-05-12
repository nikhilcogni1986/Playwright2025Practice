import {test, expect} from '@playwright/test'

test('Change the Age for a specific row', async ({ page }) => 
{
    await page.goto("http://localhost:4200/pages/iot-dashboard");
    await page.getByTitle("Tables & Data").click();
    await page.getByTitle("Smart Table").click();

    //Select the specific row by using email ID
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' });
    targetRow.locator('.nb-edit').click();
    await page.waitForTimeout(2000);
    
    //Edit the age column for the specific row
    await page.locator('input-editor').getByPlaceholder('Age').clear(); 
    await page.locator('input-editor').getByPlaceholder('Age').fill('35');
    await page.locator('.nb-checkmark').click();
    await page.waitForTimeout(2000);
});

test('Find all rows for specified Age', async ({ page }) => 
    {
        await page.goto("http://localhost:4200/pages/iot-dashboard");
        await page.getByTitle("Tables & Data").click();
        await page.getByTitle("Smart Table").click();
    
        const ages = ['20', '30', '40'];
        for (const age of ages) 
        {
            await page.locator('input-filter').getByPlaceholder('Age').clear(); 
            await page.locator('input-filter').getByPlaceholder('Age').fill(age);
            await page.waitForTimeout(2000);

            const rows = page.locator('tbody tr');
            const rowCount = await rows.count();
            console.log(`Number of rows with age ${age}: ${rowCount}`);

            for(let row of await rows.all())
            {
                const cellValue = await row.locator('td').last().textContent();
                expect(cellValue).toBe(age);
            }
        }
    });

    test("Extract text from the static table", async ({ page }) =>
    {
        await page.goto("https://testautomationpractice.blogspot.com/2018/09/automation-form.html");
        await expect(page.getByRole('heading', { name: 'Static Web Table' })).toBeVisible();

        const table = page.locator("table[name='BookTable']");
        const rows = table.locator("tr");
        const rowCount = await rows.count();
        console.log(`Number of rows in the table: ${rowCount}`);

        for (let i = 1; i <= rowCount; i++) 
        {
            const row = rows.nth(i);
            const cells = row.locator("td");
            const cellCount = await cells.count();
            console.log(`Number of cells in row ${i}: ${cellCount}`);

            for (let j = 0; j < cellCount; j++) 
            {
                const cell = cells.nth(j);
                const cellText = await cell.textContent();
                if (cellText === null) 
                {
                    throw new Error(`Cell text is null at row ${i}, cell ${j}`);
                }
                // Do something with the cell text, e.g., print it to the console
                
                if(cellText.includes("Mukesh"))
                {
                    console.log(`Found Mukesh in row ${i}, cell ${j + 1}`);
                }
                console.log(`Row ${i}, Cell ${j + 1}: ${cellText}`);
            }
        }
    });

    test("Dynamic web tables", async ({ page }) =>
    {
        await page.goto("https://testautomationpractice.blogspot.com/");
        await expect(page.getByRole('heading', { name: 'Dynamic Web Table' })).toBeVisible();

        //get the number of rows in table
        await page.locator("#taskTable tbody tr").count().then(async (rowCount) => 
        {
            expect(rowCount).toBe(4);
        })

        // Get the row count - Approach 2
        const rowCount = await page.locator("#taskTable tbody tr").count();
        console.log(`Number of rows in the table: ${rowCount}`);

        // Get the row count - Approach 3
        const parentBody = page.locator("#taskTable tbody");
        console.log(await parentBody.locator("tr").count());

        // Get the column count
        const columnCount = await page.locator("#taskTable tbody tr").locator("td").count();
        console.log(columnCount);

        //Get the No of columns  from the table
        const rows = await parentBody.locator("tr").all();
        rows.forEach(async(row)=>
        {
            console.log(await row.locator("td").count());
        })

        //Get the cell value from the table
        for(let i=0; i<rowCount; i++)
        {
            const row = await page.locator("#taskTable tbody tr").nth(i);
            const columns = await row.locator("td").all();
            const columnCount = await columns.length;

            for(let j=0; j<columnCount; j++)
            {
                const cell = await columns[j];
                const cellValue = await cell.innerText();
                console.log(cellValue);

                if(cellValue.includes("Firefox"))
                {
                    console.log(`Found Firefox in row ${i + 1}, cell ${j + 1}`);
                     
                }
            }
        }
    });