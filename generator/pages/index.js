// React
import React, { useEffect, useState, useRef } from 'react'

// Next
import Link from 'next/link'

// Components
import Head from '../components/head'
import Footer from '../components/footer'
import ChoreoPart from '../components/ChoreoPart'
import AddChoreoPartSelector from '../components/AddChoreoPartSelector'
import OnDeviceChoreoDisplay from '../components/OnDeviceChoreoDisplay'
import ChoreoCodeExport from '../components/ChoreoCodeExport'

// variable for development
const isDev = process.env.NODE_ENV === "development" ? true : false

const Home = () => {

  const [remoteName,setRemoteName] = useState("remote_1")
  const [choreography,setChoreography] = useState([])
  const [onDeviceChoreo,setOnDeviceChoreo] = useState([])
  const [newChoreoPart,setNewChoreoPart] = useState({
    type: null,
    duration: null,
    remotes: []
  })

  let classes = [];

  // Hooks —————————————————————————————————————
  useEffect(()=>{

  },[])

  useEffect(()=>{
    // console.log( "Current Choreography", choreography)
  },[choreography])

  useEffect(()=>{
    // console.log( "Current Part", newChoreoPart)
  },[newChoreoPart])


  // functions ———————————————————————————————

  const changeNewChoreoPart = (val,type) => {
    let interimPart = {...newChoreoPart}

    switch( type ){
      case "duration":
        interimPart.duration = parseInt(val)
        break
      case "remotes":
        interimPart.remotes = [...val]
        break
      case "type":
      default:
        interimPart.type = val
        break
    }

    setNewChoreoPart( interimPart )
  }


  // add new choreo part
  const addChoreoPart = () => {

    if( newChoreoPart.type && newChoreoPart.duration && newChoreoPart.remotes.length > 0 ){
      let interimChoreo = [...choreography]
      interimChoreo.push( {...newChoreoPart} )
      setChoreography( interimChoreo )
      console.log("Part added")
    }else{
      console.log("☝️ There is something missing!")
    }

  }

  const removeChoreoPart = (index) => {

    let interimChoreo = [...choreography]
    interimChoreo.splice(index, 1)
    setChoreography( interimChoreo )
    console.log("Part removed")

  }

  const changeChoreoPart = (index,val,type) => {

    let interimChoreo = [...choreography]

    switch( type ){
      case "type":
        interimChoreo[index].type = val
        break
      case "duration":
        interimChoreo[index].duration = parseInt(val)
        if( isNaN( interimChoreo[index].duration ) ){
          interimChoreo[index].duration = 0
        }
        break
      case "remotes":

        let interimRemotes = interimChoreo[index].remotes

        if( interimChoreo[index].remotes.includes( val ) ){
          if( interimChoreo[index].remotes.length > 1 ){
            interimRemotes = interimRemotes.filter((v) => {
              return v !== val
            });
          }
        }else{
          interimRemotes.push(val)
        }

        interimRemotes = interimRemotes.sort()
        interimChoreo[index].remotes = [...interimRemotes]

        break
      default:

        break
    }


    console.log(index,val,type)


    setChoreography( interimChoreo )
  }


  // Render ———————————————————————————————

  const currentChoreo = choreography.map( (c,k) =>{

    return <ChoreoPart
             key={`Choreo-Part-${k}`}
             passKey={`Choreo-Part-${k}`}
             choreoVal={c}
             removePart={()=>removeChoreoPart(k)}
             changePart={(val,type)=>changeChoreoPart(k,val,type)} />

  })


  return (
    <div className={classes.join(' ')}>

      <Head title="Home" />

      <div id="wrapper">

        <div className="choreoBuilder">

          {currentChoreo}

          <AddChoreoPartSelector
            changePart={(val,type)=>changeNewChoreoPart(val,type)}
            addPart={addChoreoPart} />

        </div>

        <ChoreoCodeExport remote={remoteName} choreo={choreography} />

        <Footer />

      </div>

    </div>
  )
}

export default Home
