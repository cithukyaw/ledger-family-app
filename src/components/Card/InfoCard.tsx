import {Avatar, Card, List, ListItem, ListItemAvatar, ListItemText, Tooltip} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { deepOrange } from '@mui/material/colors';
import React, {FC} from "react";
import {InfoCardProps} from "../../types/declarations";
import config from "../../lib/config.ts";

const InfoCard: FC<InfoCardProps> = ({ title, amount, icon, tooltip, color }: InfoCardProps) => {
  color = color || deepOrange[400]

  const getAvatar = (icon?: React.ReactNode) => {
    return (
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: color }}>
          { icon ? icon : <ImageIcon /> }
        </Avatar>
      </ListItemAvatar>
    )
  }

  const getTitle = (title: string) => {
    return <span className="my">{title}</span>
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
          <ListItemText primary={ `${amount.toLocaleString()} ${config.currencyUnit}` } secondary={getTitle(title)} />
        </ListItem>
      </List>
    </Card>
  )
}

export default InfoCard
