// React
import React, { useEffect, useState, useRef } from 'react'
import { toast, ToastContainer } from 'react-nextjs-toast'

// Next
import Link from 'next/link'

// Components
import Head from '../components/head'
import Footer from '../components/footer'
import ChoreoPart from '../components/ChoreoPart'
import AddChoreoPartSelector from '../components/AddChoreoPartSelector'
import OnDeviceChoreoDisplay from '../components/OnDeviceChoreoDisplay'
import ChoreoCodeExport from '../components/ChoreoCodeExport'
import ChoreoVisualizer from '../components/ChoreoVisualizer'

// variable for development
const isDev = process.env.NODE_ENV === "development" ? true : false

const Home = () => {

  const [remoteName,setRemoteName] = useState("remote_1")
  const [choreography,setChoreography] = useState([])
  const [onDeviceChoreo,setOnDeviceChoreo] = useState([])
  const [newChoreoPart,setNewChoreoPart] = useState({
    type: 'pause',
    duration: 10,
    remotes: [1]
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

    let interimChoreo = [...choreography]
    interimChoreo.push( {...newChoreoPart} )
    setChoreography( interimChoreo )
    console.log("Part added")

    // else{
    //   console.log("☝️ There is something missing!")
    //   toast.notify('☝️ There is something missing!', {
    //     duration: 2,
    //     type: "error",
    //     title: "Error",
    //     position: "top"
    //   })
    // }

  }

  const addStepAfter = (i) => {

    let interimChoreo = [...choreography]
    interimChoreo.splice((i+1), 0, {...newChoreoPart});
    setChoreography( interimChoreo )
    console.log("Part added after "+i)

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

        let interimRemotes = [...interimChoreo[index].remotes]

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
        // do nothing
        break
    }

    setChoreography( interimChoreo )
  }


  // Render ———————————————————————————————

  const currentChoreo = choreography.map( (c,k) =>{

    return <ChoreoPart
             key={`Choreo-Part-${k}`}
             passKey={`Choreo-Part-${k}`}
             choreoVal={c}
             addStepAfter={()=>addStepAfter(k)}
             removePart={()=>removeChoreoPart(k)}
             changePart={(val,type)=>changeChoreoPart(k,val,type)} />

  })


  return (
    <div className={classes.join(' ')}>

      <Head title="Home" />

      <div id="wrapper">

        <ChoreoVisualizer choreo={choreography} />

        <div className="choreoBuilder">

          {currentChoreo}

          {/*<AddChoreoPartSelector
            currentSelection={newChoreoPart}
            changePart={(val,type)=>changeNewChoreoPart(val,type)}
            addPart={addChoreoPart} />*/}

          <div className={"addPartButton"} onClick={()=>addChoreoPart()}>
            Add another part
          </div>

        </div>

        <ChoreoCodeExport
          remote={remoteName}
          choreo={choreography}
          onCopy={()=>toast.notify('✅ copied!', {
              duration: 2,
              type: "success",
              title: "Success",
              position: "top"
            })}  />

        <Footer />

      </div>

      <ToastContainer align={"center"} position={"top"} />

    </div>
  )
}

export default Home
