import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './Leave.css';
import { leave } from '../Services/Services';

const Leave = () => {
  // Placeholder values
  const cl = 12;
  const sl = 12;
  const totalLeave = null;
  const count = null;
  const count1 = null;
  const [alert, setAlert] = useState(null); // State to manage the alert
  const [formErrors,setFormErrors] = useState({leaveType:'',startDate:'',endDate:'',reason:'',fHDay:''});
  const [formData, setFormData] = useState({
    empId: '',
    empName: '',
    leaveType: 'sickLeave',
    startDate: '',
    endDate: '',
    reason: '',
    fHDay: 'FullDay',
    status: 'waiting for Approved',
  });
  const validate = () =>{
    let isValid = true;
    const errors ={};
    if(!formData.leaveType){
      errors.leaveType = "Please fill leaveType is";
      isValid = false;
    }
    if(!formData.startDate){
      errors.startDate = "Please fill startDate";
      isValid = false;
    }
    if(!formData.endDate){
      errors.endDate="please fill endDate";
      isValid = false;
    }
    if(!formData.reason){
      errors.reason="please fill reason";
      isValid = false;
    }
    if(!formData.reason){
      errors.fHDay="please fill fHDay";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;

  }
  useEffect(() => {
    const storedEmpId = sessionStorage.getItem('empId');
    const storedEmpName = sessionStorage.getItem('empName');
    console.log('leave empId', storedEmpId);
    console.log('leave empId', storedEmpName);

    if (storedEmpId && storedEmpName) {

      setFormData((prevData) => ({
        ...prevData,
        empId: storedEmpId,
        empName: storedEmpName,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()){
    console.log('Form data on submit:', formData); // Add this line for debugging

    leave(formData)
      .then((response) => {
        console.log('Leave request response:', response); // Log the response
        setAlert(<Alert severity="success">Leave request submitted successfully!</Alert>);
        
        // Reset form after successful submission
        setFormData((prevData) => ({
          ...prevData,
          leaveType: 'sickLeave',
          startDate: '',
          endDate: '',
          reason: '',
          fHDay: 'FullDay',
        }));

        setTimeout(() => {
          setAlert(null);
        }, 7000); // 7 seconds
      })
     
      .catch((error) => {
        setAlert(<Alert severity="faliure">Leave request submitted faliure!</Alert>);
        console.error('Error submitting leave:', error);
      });
    }
  };

  return (
    <div className="leave">
      <h4 style={{ marginTop: '-70px', marginLeft: '-10px', width: '190px' }}>Apply Leave</h4>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Leave Type"
          variant="standard"
          fullWidth
          sx={{ flexBasis: '23%', marginTop: '10px', width: '210px' }}
          InputLabelProps={{ shrink: true }}
          value={formData.leaveType}
          select
          onChange={handleChange}
          name="leaveType"
          error={Boolean(formErrors.leaveType)}
          helperText={formErrors.leaveType}
        >
          <MenuItem value="sickLeave">Sick Leave</MenuItem>
          <MenuItem value="casualLeave">Casual Leave</MenuItem>
        </TextField>
        <TextField
          label="Start Date"
          name="startDate"
          variant="standard"
          fullWidth
          sx={{ flexBasis: '13%' }}
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.startDate}
          style={{ width: '210px', marginTop: '10px', marginLeft: '50px' }}
          onChange={handleChange}
          error={Boolean(formErrors.startDate)}
          helperText={formErrors.startDate}
        />
        <TextField
          label="End Date"
          name="endDate"
          variant="standard"
          fullWidth
          sx={{ flexBasis: '23%' }}
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.endDate}
          style={{ marginTop: '20px', width: '210px' }}
          onChange={handleChange}
          error={Boolean(formErrors.endDate)}
          helperText={formErrors.leaveType}
        />
        <TextField
          label="Full/Half Day"
          variant="standard"
          fullWidth
          sx={{
            flexBasis: '23%',
            marginTop: '-50px',
            width: '210px',
            marginLeft: '270px',
          }}
          InputLabelProps={{ shrink: true }}
          value={formData.fHDay}
          select
          onChange={handleChange}
          name="fHDay"
          error={Boolean(formErrors.fHDay)}
          helperText={formErrors.fHDay}
        >
          <MenuItem value="HalfDay">Half Day</MenuItem>
          <MenuItem value="FullDay">Full Day</MenuItem>
        </TextField>
        <TextField
          label="Reason"
          name="reason"
          variant="standard"
          type="textarea"
          fullWidth
          sx={{ flexBasis: '23%' }}
          multiline
          rows={2}
          value={formData.reason}
          style={{ marginTop: '10px', width: '310px', marginLeft: '7px' }}
          onChange={handleChange}
          error={Boolean(formErrors.reason)}
          helperText={formErrors.reason}
        />
        <Button variant="contained" type="submit" style={{ marginTop: '36px', marginLeft: '90px' }}>
          Submit
        </Button>
      </form>
      <div className="totalleave">
        <p>Total CL: {cl}</p>
        <p>Total CL: {cl}</p>
        <p>Total SL: {sl}</p>
        <p>Total leave taken: {totalLeave}</p>
      </div>
        {/* Display success alert */}
        <Stack sx={{ width: '70%',marginTop:'-290px', marginLeft:'270px'}} spacing={2}>
        {alert}
      </Stack>
    </div>
  );
};

export default Leave;