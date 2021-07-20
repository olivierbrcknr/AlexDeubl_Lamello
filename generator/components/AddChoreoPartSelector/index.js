import React, { useEffect, useState, useRef } from 'react'

import styles from './AddChoreoPartSelector.module.css'

const types = ["up","down","pause","stop"]

const AddChoreoPartSelector = (props) => {

  const [type,setType] = useState("pause")
  const [remotes,setRemotes] = useState([])

  useEffect(()=>{
    props.changePart(type,"type")
  },[type])

  useEffect(()=>{
    props.changePart(remotes,"remotes")
  },[remotes])


  let classes = [styles.AddChoreoPartSelector]

  const selectors = types.map((t,k)=>{

    let tabClasses = [styles.typeSelectorTab]

    if( type === t ){
      tabClasses.push( styles.typeSelectorTabisCurrent )
    }

    return <div key={`typeSelectorTab-${k}`}
              onClick={()=>setType(t)}
              className={tabClasses.join(' ')}>
              {t}
            </div>

  })

  let remotesSelectElements = []

  for (let i = 1; i <= 4; i++){

    let isChecked = remotes.includes(i)

    const remoteSelector = <div key={`remoteSelectorTab-${i}`}>

              <input
                id={`remoteID-${i}`}
                value={isChecked}
                type="checkbox"
                onChange={(e)=>{

                  let selectedRemotes = remotes

                  if( selectedRemotes.includes(i) ){
                    selectedRemotes = selectedRemotes.filter((value, index, arr) => {
                      return value !== i
                    });

                  }else{
                    selectedRemotes.push(i)
                  }

                  selectedRemotes.sort()

                  setRemotes( [...selectedRemotes] )
                }} />
              <label htmlFor={`remoteID-${i}`} >
                Remote {i}
              </label>
            </div>

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
        defaultValue={30}
        className={styles.durationInput}
        onChange={e=>props.changePart(e.target.value,"duration")} />

      seconds

      <div className={styles.submitBtn} onClick={()=>props.addPart()}>
        Add Part
      </div>

    </div>
}

export default AddChoreoPartSelector



