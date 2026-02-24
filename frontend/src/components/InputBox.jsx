import React from 'react'

function InputBox(props) {
  return (
    <div >
        <div className='text-sm font-medium text-left py-2'>
            {props.label}
        </div>  
        <input placeholder={props.placeholder} value={props.value} onChange={props.onChange} className='w-full border rounded border-slate-200 px-2 py-1'   />
    </div>
  )
}

export default InputBox