import { MongoClient } from "mongodb";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const mongoUri = useRuntimeConfig().mongodbUri || process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error("MongoDB URI not found");
      throw createError({
        statusCode: 500,
        statusMessage: "Database configuration missing",
      });
    }

    const client = new MongoClient(mongoUri);
    await client.connect();

    const db = client.db("fossclubsrm");
    const collection = db.collection("feedback");

    const submission = {
      submittedData: body,
      submittedAt: new Date(),
      userAgent: getHeader(event, "user-agent"),
    };

    const result = await collection.insertOne(submission);

    await client.close();

    setResponseStatus(event, 201);
    return {
      success: true,
      submissionId: result.insertedId,
      message: "Form submitted successfully",
    };
  } catch (error) {
    console.error("Form submission error:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Failed to submit form",
      data: {
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
});
