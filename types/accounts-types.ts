type Status = "active" | "inactive" | "pending"; // por ejemplo

export interface Account {
    is_active: boolean;
    id: string;
    created_at: string;
    name: string;
    url_logo: string | null;
    status: Status;
}

export interface AccountResponse {
    data: Account[];
    error?: string;
}
