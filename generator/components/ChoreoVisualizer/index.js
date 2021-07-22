import React from 'react'

import styles from './ChoreoVisualizer.module.css'


const ChoreoVisualizer = (props) => {

  let classes = [styles.ChoreoVisualizer]

  let totalTime = 0

  for ( let i = 0; i < props.choreo.length; i++ ){
    totalTime += parseInt( props.choreo[i].duration )
  }

  const choreoSteps = props.choreo.map( (c,k) =>{

    let stepClasses = [styles.step]

    switch( c.type ){
      case 'down':
        stepClasses.push( styles.typeDown )
        break
      case 'up':
        stepClasses.push( styles.typeUp )
        break
      case 'pause':
        stepClasses.push( styles.typePause )
        break
      case 'stop':
        stepClasses.push( styles.typeStop )
        break
      default:
        stepClasses.push( styles.typeNone )
        break
    }

    let remoteVis = []

    for ( let r = 1; r <= 4; r++ ){

      remoteVis.push( <div className={`${styles.remote} ${ c.remotes.includes(r) || c.type === 'pause' ? styles.remoteIsActive : "" }`}>{/*r*/}</div> )
    }

    const stepWidth = c.duration / totalTime * 100 + '%'

    return <div className={stepClasses.join(' ')} key={`OnDeviceChoreo-Part-${k}`} style={{
      width: stepWidth
    }}>

      <div className={styles.stepLabel}>
        {c.type} {c.duration}s
      </div>

      {remoteVis}
    </div>

  })


  let remoteLabels = []

  for ( let r = 1; r <= 4; r++ ){
    remoteLabels.push( <div className={styles.remoteLabel}>Remote {r}</div> )
  }

  return <div className={classes.join(' ')}>

    <div className={styles.remoteLabels}>
      {remoteLabels}
    </div>

    <div className={styles.stepsContainer}>
      {choreoSteps}
    </div>

    <div className={styles.totalTime}>
      Total: {totalTime} sec
    </div>


  </div>
}

export default ChoreoVisualizer



