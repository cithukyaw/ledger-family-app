import {Avatar, Card, List, ListItem, ListItemAvatar, ListItemText, Tooltip, IconButton} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {deepOrange, red} from '@mui/material/colors';
import React, {FC} from "react";
import {InfoCardProps} from "../../types/declarations";
import config from "../../lib/config.ts";
import {Link} from "react-router-dom";

const InfoCard: FC<InfoCardProps> = ({ title, amount, icon, tooltip, color, navigateTo }: InfoCardProps) => {
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
        <ListItem
          secondaryAction={
            navigateTo ? (
              <IconButton
                component={Link}
                to={navigateTo}
                aria-label="View details"
                sx={{ color: color }}
              >
                <ArrowCircleRightIcon sx={{ width: "1.5em", height: "1.5em" }} />
              </IconButton>
            ) : null
          }
        >
          { tooltip ?
            <Tooltip title={tooltip} enterTouchDelay={0} leaveTouchDelay={3000} arrow>
              { getAvatar(icon) }
            </Tooltip>
            : getAvatar(icon)
          }
          <ListItemText
            primary={ `${amount.toLocaleString()} ${config.currencyUnit}` }
            secondary={getTitle(title)}
            primaryTypographyProps={amount < 0 ? { sx: { color: red[800] } } : undefined}
          />
        </ListItem>
      </List>
    </Card>
  )
}

export default InfoCard
