import React from "react";
import { useParams } from "react-router";

import { Avatar } from "@mui/material";

import { useStreamer } from "../../hooks/streamer";
import styles from "./StreamerDetails.module.scss";

export function StreamerDetails() {
  const { id } = useParams();
  const { streamer, isLoading, isError } = useStreamer(Number(id));

  if (isLoading) return <div className={styles.container}>loading ...</div>;
  if (isError) return <div className={styles.container}>error</div>;

  return (
    <div className={styles.container}>
      {streamer && (
        <>
          <div className={styles.streamerInfo}>
            <Avatar src={streamer.avatar} className={styles.avatar} />
            <dl className={styles.nameAndPlatform}>
              <dt>Name:</dt>
              <dd>{streamer.name}</dd>
              <dt>Platform:</dt>
              <dd>{streamer.platform}</dd>
            </dl>
          </div>
          <div className={styles.description}>
            <p>{streamer.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
