import { Locator, Page } from 'playwright';

import { BasePOM } from './BasePOM.js';
import { Bookmark, Profile } from '../../../src/profiles.js';

export class ProfileBuilder extends BasePOM {
    get profileNameInput(): Locator {
        return this.page.getByLabel('Profile Name');
    }

    get codeEditor(): Locator {
        return this.page.getByLabel('Profile Code');
    }

    get commitButton(): Locator {
        return this.page.getByText('Commit');
    }

    get visualEditor(): Locator {
        return this.page.getByTestId('profile-visual-editor');
    }

    async getProfileValue(): Promise<Profile> {
        const profileRaw = await this.codeEditor.inputValue();
        return JSON.parse(profileRaw) as Profile;
    }

    async fillProfile(profile: Profile): Promise<void> {
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
        confirm = true,
        additionalSteps?: (page: Page) => Promise<void>,
    ): Promise<void> {
        const child = await this.getChild(childUuid);
        await child.click({ position: { x: 5, y: 5 } });

        await this.selectOption('profile-select-action', action);

        if (additionalSteps) {
            await additionalSteps(this.page);
        }

        if (confirm) {
            const confirmButton = this.page.getByText('Confirm');
            await confirmButton.click();
        } else {
            const cancelButton = this.page.getByText('Cancel');
            await cancelButton.click();
        }
    }

    async addBookmarkOnContainer(
        containerUuid: string,
        bookmark: Bookmark,
        confirm = true,
    ): Promise<void> {
        await this.performActionOnChild(containerUuid, 'Add bookmark', confirm, async (page) => {
            await page.getByLabel('Label').fill(bookmark.label);
            await page.getByLabel('Icon').fill(bookmark.icon);

            let index = 0;
            for (const row of bookmark.rows) {
                if (index > 0) {
                    await page.getByText('Add Row').click();
                }

                await page.getByLabel('Title (Optional)').nth(index).fill(row.title || '');
                await page.getByLabel('URL').nth(index).fill(row.url);

                index++;
            }
        });
    }

    async editBookmarkOnContainer(
        containerUuid: string,
        actions: Array<{
            index?: number,
            field: string,
            value: string
        }>,
        confirm = true,
    ): Promise<void> {
        await this.performActionOnChild(containerUuid, 'Edit bookmark', confirm, async (page) => {
            for (const action of actions) {
                let locator = page.getByLabel(action.field);

                if (action.index !== undefined) {
                    locator = locator.nth(action.index);
                }

                await locator.fill(action.value);
            }
        });
    }
}
