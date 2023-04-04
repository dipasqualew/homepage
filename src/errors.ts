
export class FeedbackError extends Error {
    code: number;
    critical: boolean;

    constructor(message: string, code?: number, critical?: boolean) {
        super(message);
        this.code = code || 0;
        this.critical = critical || false;
    }
}

