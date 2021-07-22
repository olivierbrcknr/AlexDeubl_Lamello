import React from 'react'

import styles from './ChoreoPart.module.css'

const types = ["up","down","pause","stop"]


const ChoreoPart = (props) => {

  let classes = [styles.ChoreoPart]

  switch( props.choreoVal.type ){
    case 'down':
      classes.push( styles.typeDown )
      break
    case 'up':
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

  let typeSelectorOptions = types.map( (t,k)=>{
    return <option value={t} key={props.passKey+'-option-'+t}>
      {t}
    </option>
  } )


  let selectionOptions = null

  if( props.choreoVal.type === 'pause' ){


    selectionOptions = [<input type="number"
        min={0}
        max={3600}
        defaultValue={props.choreoVal.duration}
        className={styles.duration}
        onChange={e=>props.changePart(e.target.value,"duration")} />,
        "sec"]


  }else{

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

    selectionOptions = <div className={styles.remotes}>{remoteSelector}</div>
  }


  return <div className={classes.join(' ')} key={props.passKey}>

      <select
        value={ props.choreoVal.type }
        className={styles.typeSelector}
        onChange={e=>props.changePart(e.target.value,"type")}>
        {typeSelectorOptions}
      </select>

      {selectionOptions}

      <div className={styles.removeBtn}
        onClick={()=>props.removePart()}>
        ×
      </div>

      <div className={styles.addInbetweenStep} onClick={()=>props.addStepAfter()}>
        +
      </div>

    </div>
}

export default ChoreoPart



