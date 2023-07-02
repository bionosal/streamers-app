import React, { FormEvent, useState } from "react";
import { KeyedMutator } from "swr";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useStreamers } from "../../hooks/streamer";
import { Streamer } from "../../types";
import styles from "./StreamerList.module.scss";
import { API_URL } from "../../config";
import { jsonFetcher } from "../../utils";
import toast from "react-hot-toast";

export function StreamerList() {
  const { streamers = [], isLoading, isError, mutate } = useStreamers();

  return (
    <div className={styles.container}>
      <StreamerTable
        streamers={streamers}
        isLoading={isLoading}
        isError={isError}
      />
      <StreamerForm mutate={mutate} />
    </div>
  );
}

type StreamerTableProps = {
  streamers: Streamer[];
  isLoading: boolean;
  isError: any;
};

function StreamerTable({ streamers, isLoading, isError }: StreamerTableProps) {
  if (isLoading) return <div className={styles.streamerTable}>loading ...</div>;
  if (isError) {
    if (isError.message) {
      return <div className={styles.streamerTable}>{isError.message}</div>;
    }
    return <div className={styles.streamerTable}>Unknown Error occured</div>;
  }

  return (
    <div className={styles.streamerTable}>
      <Typography variant="h4" component="h6" color={"black"} align="left">
        Streamers Table
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Platform</TableCell>
            <TableCell align="right">Upvotes</TableCell>
            <TableCell align="right">Downvotes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {streamers.map((streamer) => (
            <TableRow key={streamer.id}>
              <TableCell align="right">
                <div className={styles.avatarCell}>
                  <Avatar src={streamer.avatar} />
                  <a href={`/streamers/${streamer.id}`}>{streamer.name}</a>
                </div>
              </TableCell>
              <TableCell align="right">{streamer.platform}</TableCell>
              <TableCell align="right">{streamer.upvote}</TableCell>
              <TableCell align="right">{streamer.downvote}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

type StreamerFormData = {
  name: string;
  platform: string;
  description: string;
  avatar: string;
};

type StreamerFormProps = {
  mutate: KeyedMutator<Streamer[]>;
};

const defaultFormData: StreamerFormData = {
  name: "",
  platform: "",
  description: "",
  avatar: "",
};

function StreamerForm({ mutate }: StreamerFormProps) {
  const [formData, setFormData] = useState<StreamerFormData>(defaultFormData);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    jsonFetcher(`${API_URL}/streamers/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        toast.success("Streamer has been added");
        mutate();
        setFormData({ ...defaultFormData });
      })
      .catch((err: Error) => toast.error(err.message));
  };

  return (
    <div className={styles.streamerForm}>
      <Typography variant="h4" component="h6" color={"black"} align="left">
        Add Streamer
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={styles.streamerInfo}>
          <TextField
            value={formData.name}
            label="Name"
            name="name"
            onChange={(event) => handleChange("name", event.target.value)}
          />
          <FormControl>
            <InputLabel id="platform">Platform</InputLabel>
            <Select
              value={formData.platform}
              onChange={(event) => handleChange("platform", event.target.value)}
              name="platform"
              labelId="platform"
              id="platform"
              label="Platform"
            >
              <MenuItem value={"Twitch"}>Twitch</MenuItem>
              <MenuItem value={"YouTube"}>YouTube</MenuItem>
              <MenuItem value={"TikTok"}>TikTok</MenuItem>
              <MenuItem value={"Kick"}>Kick</MenuItem>
              <MenuItem value={"Rumble"}>Rumble</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            onClick={handleOpen}
            endIcon={<AccountCircleIcon />}
          >
            Add avatar
          </Button>
        </div>
        <div className={styles.streamerAvatarContainer}>
          {formData.avatar && (
            <IconButton
              onClick={() =>
                setFormData((prevFormData) => ({ ...prevFormData, avatar: "" }))
              }
            >
              <ClearIcon />
            </IconButton>
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Image Url</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add an image URL for the streamer avatar.
              </DialogContentText>
              <TextField
                value={avatarUrl}
                onChange={(event) => setAvatarUrl(event.target.value)}
                autoFocus
                id="avatar"
                label="Image URL"
                type="url"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  if (avatarUrl) {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      avatar: avatarUrl,
                    }));
                    setAvatarUrl("");
                    handleClose();
                  }
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Avatar src={formData.avatar} className={styles.streamerAvatar} />
        </div>
        <TextField
          value={formData.description}
          className={styles.streamerDescription}
          label="Description"
          onChange={(event) => handleChange("description", event.target.value)}
          name="description"
          multiline
          rows={10}
        />
        <Button
          type="submit"
          variant="contained"
          className={styles.streamerSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
