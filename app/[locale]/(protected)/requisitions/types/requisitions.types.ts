export interface Requisition {
  id: string;
  created_at: string;
  start_date: string;
  status: 'Active' | 'Pending' | 'Closed' | 'Closed By Customer';
  budget: number;
  budget_type: string;
  custom_name: string;
  position_name: string;
  position_seniority: string;
  candidates: {
    accepted: number;
    rejected: number;
    required: number;
    interview: number;
    in_progress: number;
  };
  elapsed_days: number;
  days_of_last_action_by_customer: number;
  calculated_status: 'new' | 'in_progress' | 'closed';
  customer: string;
}


export interface RequisitionResponse {
    data: Requisition[];
    error?: string;
}


export interface RequisitionListParams {
    selected_division: string,
    selected_customer: string,
    status: string[],
    search_key: string,
    page: number,
    limit: number
}