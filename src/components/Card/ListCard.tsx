import {FC, useState} from "react";
import {Box, Card, Divider, List, ListItem, ListItemText} from "@mui/material";
import {grey} from "@mui/material/colors";
import dayjs from "dayjs";
import {ListCardProps} from "../../types/declarations";
import {useLongPress} from "@uidotdev/usehooks";
import ActionDialog from "../ActionDialog.tsx";
import {useNavigate} from "react-router-dom";
import {useLazyQuery} from "../../lib/hooks.ts";
import mQuery from "../../queries/mutations.ts";
import {toast} from "react-toastify";
import config from "../../lib/config.ts";

const ListCard: FC<ListCardProps> = ({ title, data, setBackdropOpen }: ListCardProps) => {
  const navigate = useNavigate();
  const initialValue = 0;
  const total = data.reduce((accumulator, row) => accumulator + row.amount, initialValue);
  const [editable, setEditable] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedAction, setSelectedAction] = useState('cancel');
  const [listData, setListData] = useState(data);

  const deleteQuery = useLazyQuery(
    async (id: number) => {
      await mQuery.deleteExpense(id); // post to server
    },
    {
      onSuccess: () => {
        const updatedData = listData.filter(row => row.id !== selectedId);
        setListData(updatedData);
        toast.success('Expense deleted!', config.toastOptions);
        setBackdropOpen(false);
      },
      onError: () => {
        toast.error('Failed to delete!', config.toastOptions);
        setBackdropOpen(false);
      }
    }
  );

  const longPressAttrs = useLongPress(
    () => setEditable(true),
    {
      threshold: 1000,
      // onStart: () => console.log('Press started'),
      // onFinish: () => console.log('Press Finished'),
      // onCancel: () => console.log('Press cancelled'),
    }
  );

  const handleActionDialogClose = (action: string) => {
    setEditable(false);
    setSelectedAction(action);
    console.log(action, selectedId, selectedTitle);

    if (action === 'edit') {
      navigate(`/expense/${selectedId}`)
    } else if (action === 'delete') {
      setBackdropOpen(true);
      deleteQuery.mutate(selectedId);
    }
  };

  const handleItemClick = (id: number, title: string) => {
    setSelectedId(id);
    setSelectedTitle(title);
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
    {listData.length > 0 &&
      <>
        <Box className="subtitle">{ dayjs(title).format("MMM D, YYYY (ddd)") }</Box>
        <Card>
          <List>
            {
              listData.map(row => (
                <Box key={row.id}>
                  <ListItem
                    secondaryAction={
                      <ListItemText sx={{ textAlign: "right" }} primary={TwoLinesText(row.amount.toLocaleString(), `(${row.type})`)} />
                    }
                    alignItems="flex-start"
                    {...longPressAttrs}
                    onMouseUp={() => handleItemClick(row.id, row.title)}
                    sx={ editable && row.id === selectedId ? { bgcolor: grey[200] } : null}
                  >

                    {/*<Collapse orientation="horizontal" in={editable}>*/}
                    {/*  <ListItemIcon sx={{ minWidth: "36px" }}>*/}
                    {/*    <DeleteIcon color="error" />*/}
                    {/*  </ListItemIcon>*/}
                    {/*</Collapse>*/}

                    <ListItemText
                      primary={row.title}
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
            selectedAction={selectedAction}
            title={selectedTitle}
            open={editable}
            onClose={handleActionDialogClose}
        />
      </>
    }
    </>
  )
}

export default ListCard;
