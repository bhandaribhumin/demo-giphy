/* eslint-disable import/no-duplicates */
// @flow

import * as React from 'react'

import { Children, useEffect, useRef } from 'react'

import Bricks from 'bricks.js'

type Props = {
  children: React.node,
  sizes: Array<Object>,
}

const Grid = ({ children, sizes }: Props) => {
  const container = useRef(null)

  useEffect(() => {
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
  }, [children])

  return (
    <div ref={container} data-testid="GridContainer">
      {children}
    </div>
  )
}

export default Grid
