import {Avatar, Card, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { deepOrange } from '@mui/material/colors';
import {FC} from "react";
import {InfoCardProps} from "../types/declarations";
import config from "../lib/config.ts";

const InfoCard: FC<InfoCardProps> = ({ title, amount, icon }: InfoCardProps) => {
  return (
    <Card sx={{ marginTop: "1em" }}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: deepOrange[400] }}>
              { icon ? icon : <ImageIcon /> }
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={ `${amount.toLocaleString()} ${config.currencyUnit}` } secondary={title} />
        </ListItem>
      </List>
    </Card>
  )
}

export default InfoCard
