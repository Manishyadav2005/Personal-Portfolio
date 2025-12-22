import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ContactRequest_Key {
  id: UUIDString;
  __typename?: 'ContactRequest_Key';
}

export interface CreateContactRequestData {
  contactRequest_insert: ContactRequest_Key;
}

export interface CreateContactRequestVariables {
  userId: UUIDString;
  message: string;
  senderEmail: string;
  senderName: string;
  subject?: string | null;
}

export interface GetUserData {
  user?: {
    id: UUIDString;
    name: string;
    email: string;
    bio?: string | null;
    profilePictureUrl?: string | null;
  } & User_Key;
}

export interface ListProjectsData {
  projects: ({
    id: UUIDString;
    title: string;
    description: string;
    imageUrl?: string | null;
  } & Project_Key)[];
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface UpdateSkillData {
  skill_update?: Skill_Key | null;
}

export interface UpdateSkillVariables {
  id: UUIDString;
  name?: string | null;
  proficiencyLevel?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateContactRequestRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateContactRequestVariables): MutationRef<CreateContactRequestData, CreateContactRequestVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateContactRequestVariables): MutationRef<CreateContactRequestData, CreateContactRequestVariables>;
  operationName: string;
}
export const createContactRequestRef: CreateContactRequestRef;

export function createContactRequest(vars: CreateContactRequestVariables): MutationPromise<CreateContactRequestData, CreateContactRequestVariables>;
export function createContactRequest(dc: DataConnect, vars: CreateContactRequestVariables): MutationPromise<CreateContactRequestData, CreateContactRequestVariables>;

interface ListProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
  operationName: string;
}
export const listProjectsRef: ListProjectsRef;

export function listProjects(): QueryPromise<ListProjectsData, undefined>;
export function listProjects(dc: DataConnect): QueryPromise<ListProjectsData, undefined>;

interface UpdateSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSkillVariables): MutationRef<UpdateSkillData, UpdateSkillVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSkillVariables): MutationRef<UpdateSkillData, UpdateSkillVariables>;
  operationName: string;
}
export const updateSkillRef: UpdateSkillRef;

export function updateSkill(vars: UpdateSkillVariables): MutationPromise<UpdateSkillData, UpdateSkillVariables>;
export function updateSkill(dc: DataConnect, vars: UpdateSkillVariables): MutationPromise<UpdateSkillData, UpdateSkillVariables>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect): QueryPromise<GetUserData, undefined>;

