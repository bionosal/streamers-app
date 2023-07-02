import useSWR from "swr";

import { API_URL } from "../config";
import { Streamer } from "../types";
import { jsonFetcher } from "../utils";

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
