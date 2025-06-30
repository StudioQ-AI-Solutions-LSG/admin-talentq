export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginError {
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// @flow
export type User = {
  id: number;
  created_at: number;
  name: string;
  email: string;
  company_name: null;
  type: string;
  platform: string[];
  session_key: string;
  general_properties: IGeneral_properties;
  customer_detail: ICustomer_detail;
  division_list: any[];
};
export type IGeneral_properties = {
  exception_keywords: any[];
  linkedin_identifier: string;
  salesq_configuration: ISalesq_configuration;
  moodq_configuration: IMoodq_configuration;
  processq_configuration: IProcessq_configuration;
  agentq_configuration: IAgentq_configuration;
  talentq_configuration: ITalentq_configuration;
};
export type ISalesq_configuration = {
  default_countries: number[];
  default_positions: number[];
  exception_keywords: string[];
  onboarding_completed: boolean;
  company_profiling_type: string;
  profiling_system_configuration: any[];
  hubspot_Identifier: string;
  opportunity_expiration_days: number;
  poc_profiling_type: string;
  poc_profiling_system_configuration: string[];
  hubspot_account_auto_sync: boolean;
  first_login_email_notified: boolean;
};
export type IMoodq_configuration = {
  default_organization: string;
  default_mood: number;
  can_only_access: null;
  allowed_organizations: IAllowedOrganizationsItem[];
};
export type IAllowedOrganizationsItem = {
  id: string;
  name: string;
};
export type IProcessq_configuration = {
  processq_user_role_id: number;
  phone_number: string;
  homepage_uuid: null;
  customers: ICustomersItem[];
};
export type ICustomersItem = {
  studioq_organization_customers_id: string;
  is_default: boolean;
};
export type IAgentq_configuration = {
  phone_number?: string;
  employee_id?: string;
  knowledge_base_identifier: string;
  agentq_roles_id?: number;
  is_onboarded?: boolean;
  accepted_toc?: boolean;
  customers?: ICustomersItem[];
};
export type ITalentq_configuration = {
  account: any[];
  customer_identifier: ICustomer_identifier;
};
export type ICustomer_identifier = {
  studioq_organization_customer_id: string;
  studioq_organization_default_division_id: string;
};
export type ICustomer_detail = {
  id: string;
  created_at: number;
  organization_id: string;
  name: string;
  url_logo: string;
  updated_at: number;
  is_onboarded: boolean;
  lsg_score_report_file_url: string;
  moodq_report_file_url: string;
  third_party_integrations: IThird_party_integrations;
  agentq_configuration: IAgentq_configuration;
};
export type IThird_party_integrations = {
  lsg_leantech: ILsg_leantech;
  lsg_leanops: ILsg_leanops;
};
export type ILsg_leantech = {};
export type ILsg_leanops = {
  main_customer_id: number;
  hubspot_id: string;
  main_customer_uuid: string;
};

export type LoginResponse = {
  authToken: string;
  email: string;
  powerq_configuration: IPowerq_configuration;
  company_name: null;
  platform: string[];
  name: string;
  talentq_configuration: ITalentq_configuration;
  id: number;
  avatar: null;
  talentq_configuration_v2: ITalentq_configuration_v2;
  session_key: string;
  powerq_configuration_v2: null;
};
export type IPowerq_configuration = {
  account_id: number;
  poc_id: number;
  user_role: number;
  user_nps_date: string;
  first_login: boolean;
  sharepoint_account_name_list: any[];
  account: any[];
};
export type ITalentq_configuration_v2 = {
  studioq_organization_customer_id: string;
  studioq_organization_default_division_id: string;
  customer_detail: ICustomer_detail;
  division_list: IDivisionListItem[];
};
export type IDivisionListItem = {
  organization_division_id: string;
  id: string;
  organization_id: string;
  created_at: number;
  name: string;
  is_active: boolean;
  third_party_integration: IThird_party_integration;
};
export type IThird_party_integration = {
  sync_system: ISync_system;
};
export type ISync_system = {
  candidate_status: string;
};
