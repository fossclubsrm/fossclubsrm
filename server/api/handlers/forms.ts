import type { H3Event } from "h3";

import type { FormSubmission } from "../../database/models/formSubmission";
import { connectToDatabase } from "../../database/connection";
import { getRequestIP } from "h3";

export async function submitForm(event: H3Event) {
  try {
    const body = await readBody(event);
    const db = await connectToDatabase();

    const { _id, ...submissionData } = body;

    const submission: Omit<FormSubmission, "_id"> = {
      formId: submissionData.formId,
      formTitle: submissionData.formTitle,
      fields: submissionData.fields,
      submittedData: submissionData.submittedData,
      submittedAt: new Date(),
      ipAddress: getRequestIP(event),
    };

    const result = await db
      .collection("form_submissions")
      .insertOne(submission);

    setResponseStatus(event, 201);
    return {
      success: true,
      submissionId: result.insertedId,
      message: "Form submitted successfully",
    };
  } catch (error) {
    setResponseStatus(event, 500);
    return {
      success: false,
      message: "Failed to submit form",
      error: (error as Error).message,
    };
  }
}

export async function getFormSubmissions(event: H3Event) {
  try {
    const query = getQuery(event);
    const db = await connectToDatabase();

    const submissions = await db
      .collection("form_submissions")
      .find(query.formId ? { formId: query.formId } : {})
      .sort({ submittedAt: -1 })
      .toArray();

    setResponseStatus(event, 200);
    return {
      success: true,
      submissions,
    };
  } catch (error) {
    setResponseStatus(event, 500);
    return {
      success: false,
      message: "Failed to fetch submissions",
      error: (error as Error).message,
    };
  }
}
