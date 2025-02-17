


import React from 'react'

function Modal({
    isOpen , 
    setIsOpen
} : {
    isOpen : boolean , 
    setIsOpen : any
}) {
  return (
    <section className='z-10 bg-red-200 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%] h-[90%]'>
        <button onClick={() => setIsOpen(false)}>x</button>
        
   </section>
  )
}

export default Modal
