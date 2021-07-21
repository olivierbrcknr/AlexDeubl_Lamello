import React from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { arduinoLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import styles from './ChoreoCodeExport.module.css'


import baseCode from './base_MultiRemote.cpp'

const ChoreoCodeExport = (props) => {

  let classes = [styles.ChoreoCodeExport]

  let generatedCode = baseCode;

  let choreoCode = "";

  props.choreo.map( (c,k) =>{

    let command = ""

    switch( c.type ){
      case 'up':
        choreoCode += `\n  // Press "Up" button, then wait for ${c.duration} seconds`
        command = "Up"
        break
      case 'down':
        choreoCode += `\n  // Press "Down" button, then wait for ${c.duration} seconds`
        command = "Down"
        break
      case 'pause':
        choreoCode += `\n  // Wait for ${c.duration} seconds`
        break
      case 'stop':
        choreoCode += `\n  // Press "My" button to stop, then wait for ${c.duration} seconds`
        command = "My"
        break
      default:

        break
    }

    if( c.type !== "pause" ){
      /*for(let i = 0; i < c.remotes.length; i++){
        choreoCode += `\n  sendCommand("${command}", ${c.remotes[i]}); // Remote ${c.remotes[i]}`
      }*/
      choreoCode += `
  int remotesCommand_${k}[${c.remotes.length}] = {${c.remotes.join(',')}}; // Remotes ${c.remotes.join(',')}
  sendCommand("${command}", remotesCommand_${k}, ${c.remotes.length});`
    }

    choreoCode +=`\n  delay(${c.duration * 1000});\n`

  })

  generatedCode = generatedCode.replace('{{choreography}}', choreoCode)

  generatedCode = generatedCode.replace('{{remoteName}}', props.remote)

  return <div className={classes.join(' ')}>

      <div className={styles.title}>
        Generated Code

        <div className={styles.copyCodeBtn} onClick={() => {
          navigator.clipboard.writeText(generatedCode)
          props.onCopy()
        }}>
          Copy Code
        </div>
      </div>

      <div className={styles.codeContainer}>

        <SyntaxHighlighter className={styles.code} language={'cpp'} style={arduinoLight}>
          {generatedCode}
        </SyntaxHighlighter>

      </div>

    </div>
}

export default ChoreoCodeExport



