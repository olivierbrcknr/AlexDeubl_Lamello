import React from 'react'

import styles from './ChoreoPart.module.css'

const ChoreoPart = (props) => {

  let classes = [styles.ChoreoPart]

  switch( props.type ){
    case 'up':
      classes.push( styles.typeDown )
      break
    case 'down':
      classes.push( styles.typeUp )
      break
    case 'pause':
      classes.push( styles.typePause )
      break
    default:
      classes.push( styles.typeNone )
      break
  }

  return <div className={classes.join(' ')} key={props.passKey}>
      {props.type} — {props.duration}s

      <div className={styles.removeBtn}
        onClick={()=>props.removePart()}>
        ×
      </div>

    </div>
}

export default ChoreoPart



