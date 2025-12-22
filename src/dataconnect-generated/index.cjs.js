const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'manish-s-tech-journey-main',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createContactRequestRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateContactRequest', inputVars);
}
createContactRequestRef.operationName = 'CreateContactRequest';
exports.createContactRequestRef = createContactRequestRef;

exports.createContactRequest = function createContactRequest(dcOrVars, vars) {
  return executeMutation(createContactRequestRef(dcOrVars, vars));
};

const listProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListProjects');
}
listProjectsRef.operationName = 'ListProjects';
exports.listProjectsRef = listProjectsRef;

exports.listProjects = function listProjects(dc) {
  return executeQuery(listProjectsRef(dc));
};

const updateSkillRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSkill', inputVars);
}
updateSkillRef.operationName = 'UpdateSkill';
exports.updateSkillRef = updateSkillRef;

exports.updateSkill = function updateSkill(dcOrVars, vars) {
  return executeMutation(updateSkillRef(dcOrVars, vars));
};

const getUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUser');
}
getUserRef.operationName = 'GetUser';
exports.getUserRef = getUserRef;

exports.getUser = function getUser(dc) {
  return executeQuery(getUserRef(dc));
};
