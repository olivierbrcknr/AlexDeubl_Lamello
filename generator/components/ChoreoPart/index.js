import React from 'react'

import styles from './ChoreoPart.module.css'

const types = ["up","down","pause","stop"]


const ChoreoPart = (props) => {

  let classes = [styles.ChoreoPart]

  switch( props.choreoVal.type ){
    case 'up':
      classes.push( styles.typeDown )
      break
    case 'down':
      classes.push( styles.typeUp )
      break
    case 'pause':
      classes.push( styles.typePause )
      break
    case 'stop':
      classes.push( styles.typeStop )
      break
    default:
      classes.push( styles.typeNone )
      break
  }

  let remoteSelector = []

  for (let i = 1; i <= 4; i++){

    let remoteSelectorClasses = [styles.remote]

    if( props.choreoVal.remotes.includes(i) ){
      remoteSelectorClasses.push( styles.remote_isActive )
    }

    let singleRemoteSelector = <div className={remoteSelectorClasses.join(' ')}
      onClick={()=>{props.changePart(i,"remotes")}}>
        {i}
      </div>

    remoteSelector.push( singleRemoteSelector )
  }


  let typeSelectorOptions = types.map( (t,k)=>{
    return <option value={t} key={props.passKey+'-option-'+t}>
      {t}
    </option>
  } )

  return <div className={classes.join(' ')} key={props.passKey}>

      <select
        value={ props.choreoVal.type }
        className={styles.typeSelector}
        onChange={e=>props.changePart(e.target.value,"type")}>
        {typeSelectorOptions}
      </select>

      <input type="number"
        min={0}
        max={3600}
        defaultValue={props.choreoVal.duration}
        className={styles.duration}
        onChange={e=>props.changePart(e.target.value,"duration")} />

      <div className={styles.remotes}>
        {remoteSelector}
      </div>

      <div className={styles.removeBtn}
        onClick={()=>props.removePart()}>
        ×
      </div>

    </div>
}

export default ChoreoPart



