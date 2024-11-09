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


test('user should not be able to add a new task without description', async () => {
    const taskName = '';
    await todoPage.addTask(taskName);
    const tasks = await todoPage.getTasks();
    expect(tasks.length, 'Task with no description is added').toBe(0);
});

test('user should not be able to clear the task if it is not completed', async () => {
    const taskName = 'Task Example 7';
    await todoPage.addTask(taskName);
    expect(await todoPage.getElementByText('Clear completed')).toBeDisabled;
});

test('user should not be able to view the completed task when Active filter is selected', async () => {
    const taskName = 'Task Example 8';
    await todoPage.addTask(taskName);
    await todoPage.completeTask(taskName);
    await todoPage.clickActiveFilter();

    const tasks = await todoPage.getTasks();
    expect(tasks.length, 'Completed Task is visible after selecting active filter').toBe(0);
});

test('user should not be able to view the a task in Completed filter if no task is Completed', async () => {
    const taskName = 'Task Example 9';
    await todoPage.addTask(taskName);
    await todoPage.clickCompletedFilter();

    const tasks = await todoPage.getTasks();
    expect(tasks.length, 'Not Completed Task is visible after selecting Completed filter').toBe(0);
});

// more scenarios
// verify that invalid characters can be added in Task Description 
// verify that long Task Description can be inserted in Task Description
// etc