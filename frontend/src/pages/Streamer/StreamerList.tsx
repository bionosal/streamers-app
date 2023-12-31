import { FormEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Avatar,
  Button,
  Chip,
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

import { API_URL } from "../../config";
import { WebsocketContext } from "../../contexts";
import styles from "./StreamerList.module.scss";
import { Streamer } from "../../types";
import { jsonFetcher } from "../../utils";

/**
 * Component for displaying a list of streamers and a form to add new streamers.
 * Uses the `WebsocketContext` to listen for socket events related to streamers.
 *
 * @returns {JSX.Element} The rendered StreamerList component
 */
export function StreamerList() {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    jsonFetcher<Streamer[]>(`${API_URL}/streamers`)
      .then((json) => setStreamers([...json]))
      .catch((err: Error) => toast.error(err.message));
    socket.on("connect", () => {
      console.log("Connected!");
    });
    socket.on("onNewStreamer", (newStreamer: Streamer) => {
      setStreamers((prevState) => [...prevState, newStreamer]);
    });
    socket.on("onStreamerVote", (updatedStreamer: Streamer) => {
      setStreamers((prevState) => [
        ...prevState.map((streamer) =>
          streamer.id === updatedStreamer.id ? updatedStreamer : streamer
        ),
      ]);
    });

    return () => {
      console.log("Unregister Events...");
      socket.off("connect");
      socket.off("onNewStreamer");
      socket.off("onStreamerVote");
    };
  }, []);
  return (
    <div className={styles.container}>
      <StreamerTable streamers={streamers} />
      <StreamerForm />
    </div>
  );
}

type StreamerTableProps = {
  streamers: Streamer[];
};

/**
 * Component for rendering the table of streamers.
 *
 * @param {StreamerTableProps} streamers - The list of streamers to display in the table
 * @returns {JSX.Element} The rendered StreamerTable component
 */
function StreamerTable({ streamers }: StreamerTableProps) {
  const handleVote = (id: number, vote: "upvote" | "downvote") => {
    jsonFetcher(`${API_URL}/streamers/${id}/vote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote: vote }),
    })
      .then(() => {
        toast.success("Vote has been added");
      })
      .catch((err: Error) => toast.error(err.message));
  };

  return (
    <div className={styles.streamerTable}>
      <Typography variant="h4" component="h6" color={"black"} align="left">
        Streamers Table
      </Typography>
      <div className={styles.tableContainer}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Platform</TableCell>
              <TableCell align="right">Upvotes</TableCell>
              <TableCell align="right">Downvotes</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <div className={styles.tableRowsContainer}>
          <Table size="small">
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
                  <TableCell align="right">
                    {" "}
                    <Chip
                      icon={<ThumbUpIcon />}
                      label={streamer.upvote}
                      onClick={() => handleVote(streamer.id, "upvote")}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      icon={<ThumbDownIcon />}
                      label={streamer.downvote}
                      onClick={() => handleVote(streamer.id, "downvote")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

type StreamerFormData = {
  name: string;
  platform: string;
  description: string;
  avatar: string;
};

const defaultFormData: StreamerFormData = {
  name: "",
  platform: "",
  description: "",
  avatar: "",
};
/**
 * Component for rendering a form to add a streamer.
 *
 * This component provides a user interface for adding streamer information,
 * including the streamer's name, platform, avatar image, and description.
 * It validates the input data and sends a POST request to the server to add the streamer.
 * If the form is successfully submitted, a success message is displayed and the form is reset.
 * Otherwise, an error message is shown.
 *
 * @returns {JSX.Element} The rendered StreamerForm component
 */

function StreamerForm() {
  const [formData, setFormData] = useState<StreamerFormData>(defaultFormData);
  const [isValidateError, setIsValidateError] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [open, setOpen] = useState(false);

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
    if (
      formData.name.length > 0 &&
      formData.description.length > 0 &&
      formData.avatar.length > 0 &&
      formData.platform.length > 0
    ) {
      jsonFetcher(`${API_URL}/streamers/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          toast.success("Streamer has been added");
          setFormData({ ...defaultFormData });
          setIsValidateError(false);
        })
        .catch((err: Error) => toast.error(err.message));
    } else {
      setIsValidateError(true);
      toast.error("Invalid streamer data");
    }
  };

  return (
    <div className={styles.streamerForm}>
      <Typography variant="h4" component="h6" color={"black"} align="left">
        Add Streamer
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className={styles.streamerInfo}>
          <TextField
            error={isValidateError && formData.name.length === 0}
            value={formData.name}
            label="Name"
            name="name"
            onChange={(event) => handleChange("name", event.target.value)}
          />
          <FormControl>
            <InputLabel id="platform">Platform</InputLabel>
            <Select
              error={isValidateError && formData.platform.length === 0}
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
            color={
              isValidateError && formData.avatar.length === 0
                ? "error"
                : undefined
            }
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
          error={isValidateError && formData.name.length === 0}
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
