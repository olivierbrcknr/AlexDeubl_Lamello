import React from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { arduinoLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import styles from './ChoreoCodeExport.module.css'


import baseCode from './base.cpp'

const ChoreoCodeExport = (props) => {

  let classes = [styles.ChoreoCodeExport]

  let generatedCode = baseCode;

  let choreoCode = "";

  props.choreo.map( (c,k) =>{

    switch( c.type ){
      case 'up':
        choreoCode += `
  // Press "Up" button, then wait for ${c.duration} seconds
  sendCommand("Up\\n");
  delay(${c.duration * 1000});
        `
        break
      case 'down':
        choreoCode += `
  // Press "Down" button, then wait for ${c.duration} seconds
  sendCommand("Down\\n");
  delay(${c.duration * 1000});
        `
        break
      case 'pause':
        choreoCode += `
  // Wait for ${c.duration} seconds
  delay(${c.duration * 1000});
        `
        break
      case 'stop':
        choreoCode += `
  // Press "My" button to stop, then wait for ${c.duration} seconds
  sendCommand("My\\n");
  delay(${c.duration * 1000});
        `
        break
      default:

        break
    }

  })

  generatedCode = generatedCode.replace('{{choreography}}', choreoCode)

  generatedCode = generatedCode.replace('{{remoteName}}', props.remote)

  return <div className={classes.join(' ')}>

      <div className={styles.title}>
        Generated Code

        <div className={styles.copyCodeBtn} onClick={() => {navigator.clipboard.writeText(generatedCode)}}>
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



