import {Avatar, Card, List, ListItem, ListItemAvatar, ListItemText, Tooltip} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { deepOrange } from '@mui/material/colors';
import React, {FC} from "react";
import {InfoCardProps} from "../../types/declarations";
import config from "../../lib/config.ts";

const InfoCard: FC<InfoCardProps> = ({ title, amount, icon, tooltip }: InfoCardProps) => {
  const getAvatar = (icon?: React.ReactNode) => {
    return (
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: deepOrange[400] }}>
          { icon ? icon : <ImageIcon /> }
        </Avatar>
      </ListItemAvatar>
    )
  }
  return (
    <Card sx={{ marginTop: "1em" }}>
      <List>
        <ListItem>
          { tooltip ?
            <Tooltip title={tooltip} enterTouchDelay={0} leaveTouchDelay={3000} arrow>
              { getAvatar(icon) }
            </Tooltip>
            : getAvatar(icon)
          }
          <ListItemText primary={ `${amount.toLocaleString()} ${config.currencyUnit}` } secondary={title} />
        </ListItem>
      </List>
    </Card>
  )
}

export default InfoCard
