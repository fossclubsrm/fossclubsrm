export interface FormField {
  id: string;
  type: "text" | "mcq" | "single_choice" | "file_upload";
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[]; // For MCQ and single choice
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  order: number;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FormResponse {
  id: string;
  form_id: string;
  data: Record<string, any>;
  submitted_at: string;
}

export interface FormMetrics {
  id: string;
  form_id: string;
  view_count: number;
  click_count: number;
  submission_count: number;
  last_viewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface FormWithMetrics extends Form {
  metrics: FormMetrics;
  response_count: number;
}
