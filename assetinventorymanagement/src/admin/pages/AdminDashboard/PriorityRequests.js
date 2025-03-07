// import React, { useState } from 'react';
// import { Table, Badge, Button, Form, Row, Col } from 'react-bootstrap';
// import { useDispatch } from 'react-redux';
// import { updateRequest } from '../../redux/requestsSlice';

// const PriorityRequests = ({ requests }) => {
//   const dispatch = useDispatch();
//   const [filters, setFilters] = useState({ status: '', urgency: '', type: '' });
//   const [sortBy, setSortBy] = useState('date');

//   const handleReview = (requestId, status) => {
//     dispatch(updateRequest({ id: requestId, status }));
//   };

//   const handleReassign = (requestId) => {
//     console.log(`Reassign request ${requestId}`); // Placeholder for reassignment logic
//   };

//   const filteredRequests = requests
//     .filter(r => !filters.status || r.status === filters.status)
//     .filter(r => !filters.urgency || r.urgency === filters.urgency)
//     .filter(r => !filters.type || r.type === filters.type)
//     .sort((a, b) => {
//       if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
//       if (sortBy === 'department') return a.userName.localeCompare(b.userName);
//       return 0; // Cost estimate sorting can be added later
//     });

//   return (
//     <div>
//       <Form className="mb-3">
//         <Row>
//           <Col>
//             <Form.Select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
//               <option value="">Filter by Status</option>
//               <option value="pending">Pending</option>
//               <option value="approved">Approved</option>
//               <option value="rejected">Rejected</option>
//             </Form.Select>
//           </Col>
//           <Col>
//             <Form.Select onChange={(e) => setFilters({ ...filters, urgency: e.target.value })}>
//               <option value="">Filter by Urgency</option>
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </Form.Select>
//           </Col>
//           <Col>
//             <Form.Select onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
//               <option value="">Filter by Type</option>
//               <option value="new">New Asset</option>
//               <option value="repair">Repair</option>
//             </Form.Select>
//           </Col>
//           <Col>
//             <Form.Select onChange={(e) => setSortBy(e.target.value)}>
//               <option value="date">Sort by Date</option>
//               <option value="department">Sort by Department</option>
//             </Form.Select>
//           </Col>
//         </Row>
//       </Form>
//       <Table striped hover>
//         <thead>
//           <tr>
//             <th>Asset</th>
//             <th>User</th>
//             <th>Urgency</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredRequests.map(request => (
//             <tr key={request.id}>
//               <td>{request.assetName}</td>
//               <td>{request.userName}</td>
//               <td>
//                 <Badge bg={request.urgency === 'high' ? 'danger' : request.urgency === 'medium' ? 'warning' : 'success'}>
//                   {request.urgency}
//                 </Badge>
//               </td>
//               <td>{request.status}</td>
//               <td>
//                 <Button variant="outline-success" size="sm" onClick={() => handleReview(request.id, 'approved')} className="me-2">Approve</Button>
//                 <Button variant="outline-danger" size="sm" onClick={() => handleReview(request.id, 'rejected')} className="me-2">Reject</Button>
//                 <Button variant="outline-info" size="sm" onClick={() => handleReassign(request.id)}>Reassign</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default PriorityRequests;