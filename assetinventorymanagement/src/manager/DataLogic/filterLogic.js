
const filterRequestsByUrgency = (requests, urgency) => {
  return requests.filter(request => request.urgency === urgency);
};

const filterRequestsByAssetType = (requests, assetType) => {
  return requests.filter(request => request.assetType === assetType);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { filterRequestsByUrgency, filterRequestsByAssetType };