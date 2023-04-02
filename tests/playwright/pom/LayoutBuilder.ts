import { Locator, Page } from 'playwright';

import { BasePOM } from './BasePOM.js';
import { Layout } from '../../../src/profiles.js';

export class LayoutBuilder extends BasePOM {
    get profileNameInput(): Locator {
        return this.page.getByLabel('Profile Name');
    }

    get codeEditor(): Locator {
        return this.page.getByLabel('Layout Code');
    }

    get visualEditor(): Locator {
        return this.page.locator('[data-test-id="layout-visual-editor"]');
    }

    async getProfileValue(): Promise<Layout> {
        const layoutRaw = await this.codeEditor.inputValue();
        return JSON.parse(layoutRaw) as Layout;
    }

    async fillProfile(profile: Layout): Promise<void> {
        await this.profileNameInput.fill(profile.name);
        await this.codeEditor.fill(JSON.stringify(profile, null, 2));
    }


    async getChild(childUuid: string): Promise<Locator> {
        const visualEditor = this.visualEditor;
        const child = await visualEditor.locator(`[data-item-uuid="${childUuid}"]`);

        return child;
    }

    async performActionOnChild(
        childUuid: string,
        action: string,
        additionalSteps?: (page: Page) => Promise<void>,
    ): Promise<void> {
        const child = await this.getChild(childUuid);
        await child.click({ position: { x: 5, y: 5 } });

        await this.selectOption('layout-select-action', action);

        if (additionalSteps) {
            await additionalSteps(this.page);
        }

        const confirm = this.page.getByText('Confirm');
        await confirm.click();
    }

    async addBookmarkOnContainer(
        containerUuid: string,
        title: string,
        url: string,
        icon: string,
    ): Promise<void> {
        await this.performActionOnChild(containerUuid, 'Add bookmark', async (page) => {
            const titleInput = page.getByLabel('Title');
            await titleInput.fill(title);

            const urlInput = page.getByLabel('URL');
            await urlInput.fill(url);

            const iconInput = page.getByLabel('Icon');
            await iconInput.fill(icon);
        });
    }
}
