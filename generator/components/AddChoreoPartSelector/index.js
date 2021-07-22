import React from 'react'

import styles from './AddChoreoPartSelector.module.css'

const types = ["up","down","pause","stop"]

const AddChoreoPartSelector = (props) => {

  let classes = [styles.AddChoreoPartSelector]

  const selectors = types.map((t,k)=>{

    let tabClasses = [styles.typeSelectorTab]

    if( props.currentSelection.type === t ){
      tabClasses.push( styles.typeSelectorTabisCurrent )
    }

    return <div key={`typeSelectorTab-${k}`}
              onClick={()=>props.changePart(t,"type")}
              className={tabClasses.join(' ')}>
              {t}
            </div>

  })

  let remotesSelectElements = []

  for (let i = 1; i <= 4; i++){

    let isChecked = props.currentSelection.remotes.includes(i)

    const remoteSelector = <label htmlFor={`remoteID-${i}`} className={styles.remoteSelectorElement} key={`remoteSelectorTab-${i}`} >
                <input
                  id={`remoteID-${i}`}
                  checked={isChecked}
                  type="checkbox"
                  onChange={(e)=>{

                    let selectedRemotes = props.currentSelection.remotes

                    if( selectedRemotes.includes(i) ){
                      selectedRemotes = selectedRemotes.filter((value) => {
                        return value !== i
                      });

                    }else{
                      selectedRemotes.push(i)
                    }

                    selectedRemotes.sort()

                    props.changePart([...selectedRemotes],"remotes")

                  }} />

                Remote {i}
              </label>


    remotesSelectElements.push(remoteSelector)
  }

  return <div className={classes.join(' ')}>

      <div className={styles.typeSelector}>
        {selectors}
      </div>

      <div className={styles.remoteSelector}>
        {remotesSelectElements}
      </div>

      <input type="number"
        min={0}
        max={3600}
        defaultValue={props.currentSelection.duration}
        className={styles.durationInput}
        onChange={e=>props.changePart(e.target.value,"duration")} />

      seconds

      <div className={styles.submitBtn} onClick={()=>props.addPart()}>
        Add Part
      </div>

    </div>
}

export default AddChoreoPartSelector



