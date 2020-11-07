/* eslint-disable import/no-duplicates */
// @flow

import * as React from 'react'

import { Children, useEffect, useRef } from 'react'

import Bricks from 'bricks.js'

type Props = {
  children: React.ReactNode,
  sizes: any[],
}

const Grid = ({ children, sizes }: Props) => {
  const container:null | any = useRef(null)
  useEffect(() => {
    if(container.current != null){ 
      const bricks = Bricks({
        container: container.current,
        packed: 'data-packed',
        sizes,
        position: true,
      })
  
      bricks.resize(true)
  
      if (Children.count(children) > 0) {
        bricks.pack()
      }
    }
    
  }, [container])

  return (
    <div  ref={el => { console.log('e',el); container.current = el; }}  data-testid="GridContainer">
      {children ? children : ''}
    </div>
  )
}

export default Grid
