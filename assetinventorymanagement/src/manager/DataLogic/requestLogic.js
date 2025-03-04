
const createRequest = async (requestData) => {
  try {
    const response = await fetch('/api/requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating request:', error);
  }
};


const approveRequest = async (requestId) => {
  try {
    const response = await fetch(`/api/requests/approve/${requestId}`, {
      method: 'PUT',
    });
    return await response.json();
  } catch (error) {
    console.error('Error approving request:', error);
  }
};


const rejectRequest = async (requestId) => {
  try {
    const response = await fetch(`/api/requests/reject/${requestId}`, {
      method: 'PUT',
    });
    return await response.json();
  } catch (error) {
    console.error('Error rejecting request:', error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { createRequest, approveRequest, rejectRequest };