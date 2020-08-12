import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Project {
  readonly id: string;
  readonly name?: string;
  readonly teamID: string;
  readonly team?: Team;
  constructor(init: ModelInit<Project>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
}

export declare class Team {
  readonly id: string;
  readonly name: string;
  constructor(init: ModelInit<Team>);
  static copyOf(source: Team, mutator: (draft: MutableModel<Team>) => MutableModel<Team> | void): Team;
}