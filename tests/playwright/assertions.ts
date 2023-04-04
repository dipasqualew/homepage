import { Locator, expect } from '@playwright/test';

export const assertDefaultProfile = async (locator: Locator) => {
    await expect(locator).toContainText('gmail:home');
    await expect(locator).toContainText('gmail:work');
    await expect(locator).toContainText('gdrive');
    await expect(locator).toContainText('gcalendar');
    await expect(locator).toContainText('chatgpt');
    await expect(locator).toContainText('1password');
};
