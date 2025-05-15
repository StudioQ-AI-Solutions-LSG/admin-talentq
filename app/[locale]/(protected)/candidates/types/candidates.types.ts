export interface Candidate {
    id: number;
    name: string;
    join_to_req: string;
    interview_date: string;
    decision_date: string;
    activation_date: string;
    billing_date: string;
    durations: {
        join_to_interview: string;
        interview_to_decision: string;
        decision_to_activation: string;
        activation_to_billing: string;
    };
}

export interface CandidateResponse {
    data: Candidate[];
    error?: string;
}


export interface CandidateListParams {
    selected_division: string,
    selected_customer: string,
    selected_customer_name?: string,
    requisition_position_id: string | null,
    search_key: string,
    page: number,
    limit: number
}