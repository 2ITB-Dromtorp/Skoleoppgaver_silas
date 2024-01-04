import React from 'react'
import './popup.css'

function Kvitering(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='inner-popup'>
            <button className='close-btn' onClick={() => props.setTrigger(false)}>Lukk</button>
            { props.children }
        </div>
    </div>
  ) : "";
}

export default Kvitering