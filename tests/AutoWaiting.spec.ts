import {test, expect} from '@playwright/test'

test("Auto waiting test in PW", async({page})=>{

    await page.goto("http://uitestingplayground.com/ajax");
    await page.getByText("Button Triggering AJAX Request").click();
    
    const text = await page.locator(".bg-success").textContent();
    expect(text).toEqual("Data loaded with AJAX get request.");
});

test("Auto waiting test using network idle", async({page})=>{

    await page.goto("http://uitestingplayground.com/ajax");
    await page.getByText("Button Triggering AJAX Request").click();
    
    await page.waitForLoadState('networkidle');
    const text = await page.locator(".bg-success").allTextContents();
    expect(text).toContain("Data loaded with AJAX get request.");
});

test("Auto waiting test using response", async({page})=>{

    await page.goto("http://uitestingplayground.com/ajax");
    await page.getByText("Button Triggering AJAX Request").click();
    
    await page.waitForResponse("http://uitestingplayground.com/ajaxdata");
    const text = await page.locator(".bg-success").allTextContents();
    expect(text).toContain("Data loaded with AJAX get request.");
});

test.only("Demonstrate Mose click", async({page})=>{

    await page.goto("http://uitestingplayground.com/click");
    await page.getByText("Button That Ignores DOM Click Event").click();
});


