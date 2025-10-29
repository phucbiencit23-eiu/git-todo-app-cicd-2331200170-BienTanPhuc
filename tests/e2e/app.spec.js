const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- TODO: Task 1: Add a new todo item ---
    const inputField = await window.locator('#todo-input');
    await inputField.fill(taskText);
    const addButton = await window.locator('#add-todo-btn');
    await addButton.click();


    // --- TODO: Task 2: Verify the todo item was added ---
    const newTodoItem = await window.locator('.todo-item');
    const newTodoItemText = await newTodoItem.textContent();
    expect(newTodoItemText).toContain(taskText);


    // --- TODO: Task 3: Mark the todo item as complete ---
    const newTodoItemCheckbox = await newTodoItem.locator('input[type="checkbox"]');
    await newTodoItemCheckbox.check();
    await expect(newTodoItem).toBeVisible('completed');


    // --- TODO: Task 4: Delete the todo item ---
    const newTodoItemDeleteButton = await newTodoItem.locator('.delete-btn');
    await newTodoItemDeleteButton.click();
    await expect(newTodoItem).not.toBeVisible();


    // Close the app
    await electronApp.close();
});
