
import { Locator } from '@playwright/test';

import { BasePOM } from './BasePOM.js';

export class PageToolbarPOM extends BasePOM {

    getAllProfileChips(): Locator {
        return this.page.locator('.profile-chip');
    }

    getProfileChip(profileUuid: string): Locator {
        return this.page.getByTestId(`profile-chip-${profileUuid}`);
    }
}
