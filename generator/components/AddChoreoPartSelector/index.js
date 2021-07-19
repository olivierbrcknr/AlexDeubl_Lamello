import React, { useEffect, useState, useRef } from 'react'

import styles from './AddChoreoPartSelector.module.css'

const types = ["up","down","pause"]

const AddChoreoPartSelector = (props) => {

  const [type,setType] = useState("pause")

  useEffect(()=>{
    props.changePart(type,false)
  },[type])


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

  return <div className={classes.join(' ')}>

      <div className={styles.typeSelector}>
        {selectors}
      </div>

      <input type="number"
        defaultValue={30}
        className={styles.durationInput}
        onChange={e=>props.changePart(e.target.value,true)} />

      seconds

      <div className={styles.submitBtn} onClick={()=>props.addPart()}>
        Add Part
      </div>

    </div>
}

export default AddChoreoPartSelector



