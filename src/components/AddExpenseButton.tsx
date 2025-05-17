import { Button } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddExpenseButton: FC = () => {
  return (
    <Button
        fullWidth
        className="btn-rounded btn-orange"
        size="large"
        variant="contained"
        component={Link}
        to="/expense/add"
        startIcon={<AddCircleOutlineIcon />}
    >
      <span className="my">အသုံးစရိတ်ထည့်ရန်</span>
    </Button>
  )
}

export default AddExpenseButton
