import React from 'react'

function HeadingComponent(props) {
  return (
    <div className='font-bold text-4xl pt-6'>
        {props.label}
    </div>
  )
}

export default HeadingComponent