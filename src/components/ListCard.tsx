import {FC, useState} from "react";
import {Box, Card, Collapse, Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import {ListCardProps} from "../types/declarations";

const ListCard: FC<ListCardProps> = ({ title, data }: ListCardProps) => {
  const initialValue = 0;
  const total = data.reduce((accumulator, row) => accumulator + row.amount, initialValue);
  const [allowDelete] = useState<boolean>(false);

  const twoLinesText = (primaryText: string, secondaryText?: string, className?: string) => {
    return (
      <>
        <Box className={ className ? className : ''}>{ primaryText }</Box>
        { secondaryText && <Box sx={{ color: 'text.secondary' }}>{ secondaryText}</Box>}
      </>
    )
  }

  return (
    <>
    {data.length > 0 &&
      <>
        <Box className="subtitle">{ dayjs(title).format("MMM D, YYYY (ddd)") }</Box>
        <Card>
          <List>
            {
              data.map(row => (
                <Box key={row.id}>
                  <ListItem secondaryAction={
                    <ListItemText sx={{ textAlign: "right" }} primary={twoLinesText(row.amount.toLocaleString(), `(${row.type})`)} />
                  } alignItems="flex-start">

                    <Collapse orientation="horizontal" in={allowDelete}>
                      <ListItemIcon sx={{ minWidth: "36px" }}>
                        <DeleteIcon color="error" />
                      </ListItemIcon>
                    </Collapse>

                    <ListItemText primary={row.title} secondary={twoLinesText(row.category.name, row.remarks, 'text-warning')} />
                  </ListItem>
                  <Divider />
                </Box>
              ))
            }

            {/*Total by day*/}
            <ListItem
              className="bold"
              secondaryAction={
                <ListItemText primary={total.toLocaleString()} />
              }>
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
