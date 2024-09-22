import {FC} from "react";
import {
  Avatar,
  Dialog, DialogContent, DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from "@mui/material";
import {orange} from "@mui/material/colors";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ActionDialogProps} from "../types/declarations";

const ActionDialog: FC<ActionDialogProps> = (props: ActionDialogProps) => {
  const { selectedAction, open, onClose, title } = props;

  const handleClose = () => {
    onClose(selectedAction);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Your Action</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "center" }}>{ title }</DialogContentText>
      </DialogContent>
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton onClick={() => handleListItemClick('edit')}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                <EditIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Edit" />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton onClick={() => handleListItemClick('delete')}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                <DeleteForeverIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleListItemClick('cancel')}>
            <ListItemAvatar>
              <Avatar>
                <ArrowBackIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  )
}

export default ActionDialog;
