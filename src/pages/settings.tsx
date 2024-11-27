import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import { ListItemIcon } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { updateUserData } from "../services/userData";
import { useAuthContext } from "../context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface BasicMenuProps {
    username: string | null;
  }

export default function Settings({ username }: BasicMenuProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: username,
    password: "",
    repeatPassword: ""
  });

  const { user } = useAuthContext();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    const userId = user.userId;
    const dataToUpdate = {
      username: formData.username,
      password: formData.password,
    };

    try {
        const response = await updateUserData(userId, dataToUpdate);
        if (response) {
          alert("User details updated successfully!");
          setFormData({
            username: username,
            password: "",
            repeatPassword: ""
          });
          handleClose();
        }
      } catch (error) {
        alert("An error occurred while updating user details.");
      }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.stopPropagation(); // Stop the event from propagating
    }
  };

  return (
    <Box>
      <Typography 
        component="div" 
        sx={{ cursor: "pointer", textAlign: "center" }}
        onClick={handleOpen}
        role="button"
        display={"flex"}
        alignItems={"center"}
      >
        <ListItemIcon>
            <SettingsIcon fontSize="small" color="primary" />
          </ListItemIcon>
        Settings
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="settings-modal-title"
        aria-describedby="settings-modal-description"
        onKeyDown={handleKeyDown} 
      >
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography id="settings-modal-title" variant="h5">
              Settings
            </Typography>
            <IconButton onClick={handleClose} disableRipple>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Username"
                defaultValue={username}
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                autoComplete="username" 
                autoFocus
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                autoComplete="new-password"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Repeat Password"
                name="repeatPassword"
                type="password"
                value={formData.repeatPassword}
                onChange={handleChange}
                variant="outlined"
                autoComplete="repeat-password"
              />
            </Box>
            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              color="primary"
            >
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
