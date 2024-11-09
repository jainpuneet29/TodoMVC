import { expect } from '@playwright/test';
import { Page } from 'playwright';
import { BasePage } from './BasePage';

export class TodoPage extends BasePage {
    
    constructor(page: Page) {
        super(page);
    }

    async addTask(task: string) {
        const inputField = this.page.locator('#todo-input');
        expect(inputField).toBeVisible;
        expect(inputField).toBeEnabled;

        await this.type('#todo-input', task);
        await this.page.getByTestId('text-input').press('Enter');
    }

    async getTasks() {
        return this.getElementsText('.view');
    }

    async editTask(existingTaskName: string, newTaskName: string){
        await this.page.getByTestId('todo-item-label').dblclick();

        const input = this.page.getByTestId('todo-item').getByTestId('text-input');
        await input.fill(newTaskName);
        await input.press('Enter');
    }

    async clickDeleteTaskButton() {
        await this.page.getByTestId('todo-item-label').hover();
        await this.page.getByTestId('todo-item-button').click();
    }

    async completeTask(taskName: string) {
        await this.page.locator(`//label[contains(text(), '${taskName}')]//preceding-sibling::input`).click();
    }

    async getTasksLeftCount(){
        const text = await this.getText('.todo-count');
        let count: number = 0;
        if (!(text?.startsWith('0'))){
            if (text === null) throw new Error('text is null');
            count = parseInt((text.split(' '))[0]);
        }
        return count;
    }

    async clickActiveFilter() {
        await this.page.locator(`//a[@href='#/active']`).click();
    }

    async clickCompletedFilter() {
        await this.page.locator(`//a[@href='#/completed']`).click();
    }
}

