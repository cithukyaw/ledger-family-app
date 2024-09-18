import {FC, useState} from "react";
import {Box, Card, Divider, List, ListItem, ListItemText} from "@mui/material";
import {grey} from "@mui/material/colors";
import dayjs from "dayjs";
import {ListCardProps} from "../types/declarations";
import {useLongPress} from "@uidotdev/usehooks";
import ActionDialog from "./ActionDialog.tsx";

const ListCard: FC<ListCardProps> = ({ title, data }: ListCardProps) => {
  const initialValue = 0;
  const total = data.reduce((accumulator, row) => accumulator + row.amount, initialValue);
  const [editable, setEditable] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedAction, setSelectedAction] = useState('cancel');

  const longPressAttrs = useLongPress(
    () => setEditable(true),
    {
      // onStart: () => console.log('Press started'),
      // onFinish: () => console.log('Press Finished'),
      // onCancel: () => console.log('Press cancelled'),
      threshold: 500,
    }
  );

  const handleActionDialogClose = (action: string) => {
    setEditable(false);
    setSelectedAction(action);
    console.log(action, selectedId);

    if (action === 'edit') {
      // TODO: go to edit screen
    } else if (action === 'delete') {
      // TODO: delete query
    }
  };

  const handleItemClick = (id: number) => {
    setSelectedId(id);
  }

  const TwoLinesText = (primaryText: string, secondaryText?: string, className?: string) => {
    return (
      <div onClick={() => setEditable(false)}>
        <Box className={ className ? className : ''}>{ primaryText }</Box>
        { secondaryText && <Box sx={{ color: 'text.secondary' }}>{ secondaryText}</Box>}
      </div>
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
                  <ListItem
                    secondaryAction={
                      <ListItemText sx={{ textAlign: "right" }} primary={TwoLinesText(row.amount.toLocaleString(), `(${row.type})`)} />
                    }
                    alignItems="flex-start"
                    {...longPressAttrs}
                    onMouseUp={() => handleItemClick(row.id)}
                    sx={ editable && row.id === selectedId ? { bgcolor: grey[200] } : null}
                  >

                    {/*<Collapse orientation="horizontal" in={editable}>*/}
                    {/*  <ListItemIcon sx={{ minWidth: "36px" }}>*/}
                    {/*    <DeleteIcon color="error" />*/}
                    {/*  </ListItemIcon>*/}
                    {/*</Collapse>*/}

                    <ListItemText
                      primary={`${row.title}: ${row.id}`}
                      secondary={TwoLinesText(row.category.name, row.remarks, 'text-warning')}
                    />
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

        <ActionDialog
            selectedValue={selectedAction}
            open={editable}
            onClose={handleActionDialogClose}
        />
      </>
    }
    </>
  )
}

export default ListCard;
