import {FC} from "react";
import {Box, Card, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import {ListCardProps} from "../types/declarations";

const ListCard: FC<ListCardProps> = ({ title, data }: ListCardProps) => {
  const initialValue = 0;
  const total = data.reduce((accumulator, row) => accumulator + row.amount, initialValue);

  return (
    <>
    {data.length > 0 &&
      <>
        <Box className="subtitle">{ dayjs(title).format("MMM D, YYYY (ddd)") }</Box>
        <Card>
          <List>
            {
              data.map(row => (
                <ListItem key={row.id} secondaryAction={<ListItemText primary={row.amount.toLocaleString()} />}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <DeleteIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary={row.title} secondary={row.remarks} />
                </ListItem>
              ))
            }
            {/*Total by day*/}
            <ListItem
              className="bold"
              secondaryAction={
                <ListItemText primary={total.toLocaleString()} />
              }
            >
              <ListItemText primary="Total" />
            </ListItem>
          </List>
        </Card>
      </>
    }
    </>
  )
}

export default ListCard;
