import axios, { AxiosError, AxiosResponse } from 'axios';

export const generateContentInJson = async (
  promptTextForJson: string,
  mimeType: string,
  data: string,
  token: string,
) => {
  const region = process.env.REGION ?? 'asia-southeast1';
  const projectId = process.env.VERTEX_PROJECT_ID ?? '';
  const accessToken = process.env.VERTEX_ACCESS_TOKEN_1HR ?? '';
  const vertexSvcUrl = `https://${region}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${region}/publishers/google/models/gemini-1.5-pro:generateContent`;

  let axiosRes: AxiosResponse;
  try {
    axiosRes = await axios.post(
      vertexSvcUrl,
      {
        contents: [
          {
            role: 'USER',
            parts: [
              { text: promptTextForJson },
              { inlineData: { mimeType, data } },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${token ?? accessToken}`,
        },
      },
    );
  } catch (error) {
    const errObj = ((error as AxiosError)?.response?.data as { error: unknown })
      ?.error;
    const errMsg = `ERROR [VERTEX]: ${errObj ? JSON.stringify(errObj) : 'Encountered error when invoking Vertex API.'}`;
    console.error(errMsg);
    throw { error: errMsg };
  }

  const candidates = axiosRes?.data?.candidates;
  if (!candidates?.length) {
    const errMsg = 'ERROR [VERTEX]: No candidates in response';
    console.error(errMsg);
    throw { error: errMsg };
  }

  const result = candidates?.[0];

  const parts = result?.content?.parts;
  if (!parts?.length) {
    const errMsg = 'ERROR [VERTEX]: No parts in response';
    console.error(errMsg);
    throw { error: errMsg };
  }

  const jsonString = String(result?.content?.parts?.[0]?.text) ?? '';

  const regex = /json|`|\n|\s/gi;
  const parsedJsonString = jsonString.replaceAll(regex, '');

  try {
    const content = JSON.parse(parsedJsonString);
    return content;
  } catch (error) {
    const errMsg = `ERROR [VERTEX]: Error when parsing response to JSON - ${error}`;
    console.error(errMsg);
    throw { error: errMsg };
  }
};
