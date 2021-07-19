import React from 'react'
import Link from 'next/link'

import styles from './footer.module.css';

const Footer = (props) => {

  let classes = [styles.Footer]

  classes.push(props.className)

  return (
    <footer className={classes.join(' ')}>
      2021 &copy; <a href="https://olivierbrueckner.de/">Olivier Brückner</a>  — built for <a href="http://www.alexanderdeubl.com/">Alexander Deubl</a>
    </footer>
  )
}

export default Footer
