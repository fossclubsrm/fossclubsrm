/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormField {
  name: string;
  type: "text" | "email" | "textarea" | "select" | "checkbox" | "radio";
  label: string;
  required: boolean;
  options?: string[];
  value?: any;
}

export interface FormSubmission {
  _id?: string;
  formId: string;
  formTitle: string;
  fields: FormField[];
  submittedData: Record<string, any>;
  submittedAt: Date;
  ipAddress?: string;
}
