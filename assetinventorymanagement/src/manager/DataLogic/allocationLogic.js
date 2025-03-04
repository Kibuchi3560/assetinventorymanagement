
export const allocateAsset = async (assetId, employeeId, quantity) => {
  try {
    const response = await fetch('/api/allocate-asset', {
      method: 'POST',
      body: JSON.stringify({ assetId, employeeId, quantity }),
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  } catch (error) {
    console.error('Error allocating asset:', error);
  }
};

export const getAllocations = async () => {
  try {
    const response = await fetch('/api/allocations');
    return await response.json();
  } catch (error) {
    console.error('Error fetching allocations:', error);
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { allocateAsset, getAllocations };