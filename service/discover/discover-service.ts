import axios from 'axios';
import { Request } from 'express';

export const discoverHealthierChoice = async (req: Request) => {
  const region = process.env.REGION ?? 'asia-southeast1';
  const projectId = process.env.VERTEX_PROJECT_ID ?? '';
  const accessToken = process.env.VERTEX_ACCESS_TOKEN_1HR ?? '';
  const vertexSvcUrl = `https://${region}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${region}/publishers/google/models/gemini-1.5-pro:generateContent`;

  const promptText =
    'Return a formatted JSON with keys brand, productName, isHealthierChoice and nutrigrade, with nutrigrade being the encircled letter';

  const result = await axios.post(
    vertexSvcUrl,
    {
      contents: [
        {
          role: 'USER',
          parts: [
            {
              text: promptText,
            },
            {
              inlineData: {
                mimeType: req.body?.mimeType,
                data: req.body?.data,
              },
            },
          ],
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${req.body?.token ?? accessToken}`,
      },
    },
  );

  return result?.data ?? null;
};
