import React from 'react'

import styles from './OnDeviceChoreoDisplay.module.css'


const OnDeviceChoreoDisplay = (props) => {

  let classes = [styles.OnDeviceChoreoDisplay]

  const choreoSteps = props.choreo.map( (c,k) =>{

    let stepClasses = [styles.step]

    switch( c.type ){
    case 'up':
      stepClasses.push( styles.typeDown )
      break
    case 'down':
      stepClasses.push( styles.typeUp )
      break
    case 'pause':
      stepClasses.push( styles.typePause )
      break
    default:
      stepClasses.push( styles.typeNone )
      break
  }

    return <div className={stepClasses.join(' ')} key={`OnDeviceChoreo-Part-${k}`}>
      {c.type} — {c.duration}s
    </div>

  })

  return <div className={classes.join(' ')}>

      <div className={styles.title}>
        On Device
      </div>

      <div className={styles.stepContainer}>
        {choreoSteps}
      </div>

    </div>
}

export default OnDeviceChoreoDisplay



