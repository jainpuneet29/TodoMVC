import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/ToDoPage';
import { config } from '../../utils/testConfig';

let todoPage: TodoPage;

test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.navigate(config.baseURL);
    expect(page).toHaveTitle('TodoMVC: React');
    expect(await todoPage.getText('h1'), 'Header of the home page is not correct.').toEqual('todos'); 
});

test('user should be able to add a new task', async () => {
    const taskName = 'Task Example 1';
    await todoPage.addTask(taskName);

    expect(await todoPage.getText('.selected')).toContain('All');
    expect(await todoPage.getElementByText('Active')).toBeVisible;
    expect(await todoPage.getElementByText('Completed')).toBeVisible;
    expect(await todoPage.getElementByText('Clear completed')).toBeVisible;
    expect(await todoPage.getElementByText('Clear completed')).toBeDisabled;
    
    const tasks = await todoPage.getTasks();
    expect(tasks).toContain(taskName);
    expect(await todoPage.getTasksLeftCount()).toEqual(1);
});

test('user should be able to edit an existing task', async () => {
    const taskName = 'Task Example 2';
    await todoPage.addTask(taskName);
    await todoPage.editTask(taskName, `Edited ${taskName}`);
    const tasks = await todoPage.getTasks();
    expect(tasks).toContain(`Edited ${taskName}`);
});

test('user should be able to delete an existing task', async () => {
    await todoPage.addTask('Task Example 3');
    await todoPage.clickDeleteTaskButton();
    const tasks = await todoPage.getTasks();
    expect(tasks.length, 'Task not deleted').toBe(0);
});

test('user should be able to complete an existing task', async () => {
    const taskName = 'Task Example 4';
    await todoPage.addTask(taskName);
    await todoPage.completeTask(taskName);

    expect((await todoPage.getText('.todo-count'))).toContain('0 items left!')
    // expect(this.page.locator('label[style*="text-decoration: line-through"]')).toBeTruthy;
    expect(await todoPage.getTasksLeftCount()).toEqual(0);
});

test('user should be able to add multiple tasks', async () => {
    await todoPage.addTask('Task Example 5');
    await todoPage.addTask('Task Example 6');
    expect(await todoPage.getTasksLeftCount()).toEqual(2);
});

// more scenarios
// user should be able to view only the Active task(s)
// user should be able to view only the Completed task(s)
// user should be able to clear the Completed task(s)
// user is able to add multiple tasks with same description
// etc