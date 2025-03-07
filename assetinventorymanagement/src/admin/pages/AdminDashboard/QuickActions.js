// import React from 'react';
// import { Button, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { approveAllRequests } from '../../redux/requestsSlice';


// const QuickActions = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleApproveAll = () => {
//     dispatch(approveAllRequests());
//   };

//   return (
//     <Card className="shadow-sm mb-4">
//       <Card.Body className="d-grid gap-2">
//         {/* <Button variant="primary" size="sm" onClick={handleApproveAll}>Approve All Requests</Button> */}
//         <Button variant="success" size="sm" onClick={() => navigate('/admin/assets')}>Add New Asset</Button>
//         <Button variant="info" size="sm" onClick={() => navigate('/admin/reports')}>Generate Report</Button>
//         <Button variant="warning" size="sm" onClick={() => console.log('Bulk Assignments')}>Create Bulk Assignments</Button>
//       </Card.Body>
//     </Card>
//   );
// };

// export default QuickActions;