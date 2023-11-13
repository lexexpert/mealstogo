import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { addMockImage, mocks } from "./mock/index";

export const placesRequest = onRequest((request, response) => {
  try {
    const { location = "" } = request.query || {};
    const placeMock = mocks[String(location).toLowerCase() || "san francisco"];
    placeMock.results = placeMock.results.map(addMockImage);
    response.json(placeMock);
  } catch (error) {
    logger.error(error);
    response.json([]);
  }
});
