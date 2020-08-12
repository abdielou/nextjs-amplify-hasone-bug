// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

//////////////////////////////////
// TODO: HACK to allow NextJS DEV
let models = {};
if (typeof window !== "undefined") {
  models = initSchema(schema);
}
const { Project, Team } = models;
//////////////////////////////////

export {
  Project,
  Team
};