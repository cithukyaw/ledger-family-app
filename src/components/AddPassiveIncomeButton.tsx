import { Button } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddPassiveIncomeButton: FC = () => {
  return (
    <Button
        fullWidth
        className="btn-rounded btn-orange"
        size="large"
        variant="contained"
        component={Link}
        to="/passive-income/add"
        startIcon={<AddCircleOutlineIcon />}
    >
      <span className="my">အပိုဝင်ငွေထည့်ရန်</span>
    </Button>
  )
}

export default AddPassiveIncomeButton