import { useState, useEffect } from 'react'
import { Auth, DataStore, Predicates } from 'aws-amplify'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Project, Team } from '../models'
import styles from '../../styles/Home.module.css'

function Home() {
  const [userData, setUserData] = useState()
  const [projects, setProjects] = useState([])
  const [teams, setTeams] = useState([])

  useEffect(() => {
    let dataSubs = []
    //#region GQL Subscriptions
    Auth.currentAuthenticatedUser()
      .then(userData => {
        setUserData(userData)
        fetchData()
        dataSubs.push(DataStore.observe(Project).subscribe(fetchData))
        dataSubs.push(DataStore.observe(Team).subscribe(fetchData))
      })

    const unsubscribe = (subscription) => subscription && subscription.unsubscribe()
    return () => {
      console.log(`unsubscribing`, dataSubs.length)
      dataSubs.forEach(unsubscribe)
    }
  }, [])

  function fetchData() {
    DataStore.query(Project, Predicates.ALL)
      .then(projects => {
        console.log('[DataStore]', 'projects', projects)
        setProjects(projects);
      })
    DataStore.query(Team, Predicates.ALL)
      .then(teams => {
        console.log('[DataStore]', 'teams', teams)
        setTeams(teams);
      })
  }

  async function createProject() {
    const { username: owner } = userData;
    await DataStore.save(
      new Team({
        name: `Team-${Number(Date.now()).toString()}`
       })
    )
      .then(async ({ id: teamID }) => {
        await DataStore.save(
          new Project({ teamID })
        ).then(project => {
          console.log(project)
          fetchData()
        });
      })
  }


  function deleteProject(project) {
    try {
      console.warn(project)
      DataStore.delete(Project, project.id);
    } catch (error) {
      console.error('[DataStore.deleteProject', error);
    }
  }

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <AmplifySignOut />
        <h1 className={styles.title}>
          Hello
        </h1>
        <button onClick={() => createProject()}>CREATE</button>

        {projects.map(project => {
          const { id, name, teamID } = project
          return (
            <div key={id}>
              <div>
                {id} || {name} || {teamID}
              </div>
              <button onClick={() => deleteProject(project)}>DELETE</button>
            </div>
          )
        })}
      </main>

    </div>
  )
}

export default withAuthenticator(Home)