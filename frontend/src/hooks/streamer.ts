import useSWR from "swr";

import { API_URL } from "../config";
import { Streamer } from "../types";
import { jsonFetcher } from "../utils";

/**
 * Custom hook for fetching a specific streamer's data.
 *
 * @param {number} streamerId - The ID of the streamer to fetch.
 * @returns {object} An object containing the streamer data, loading state, error state, and mutate function.
 */
export function useStreamer(streamerId: number) {
  const { data, error, isLoading, mutate } = useSWR<Streamer>(
    `${API_URL}/streamers/${streamerId}`,
    jsonFetcher
  );

  return {
    streamer: data,
    isLoading,
    isError: error,
    mutate,
  };
}
