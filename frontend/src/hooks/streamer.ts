import useSWR from "swr";

import { Streamer } from "../types";
import { API_URL } from "../config";
import { jsonFetcher } from "../utils";

export function useStreamers() {
  const { data, error, isLoading, mutate } = useSWR<Streamer[]>(
    `${API_URL}/streamers`,
    jsonFetcher
  );

  return {
    streamers: data,
    isLoading,
    isError: error,
    mutate,
  };
}

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
