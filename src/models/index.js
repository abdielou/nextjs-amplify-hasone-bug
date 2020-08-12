// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Project, Team } = initSchema(schema);

export {
  Project,
  Team
};