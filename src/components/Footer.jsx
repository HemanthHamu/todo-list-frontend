import React from 'react'
import '../styles/footer.css'
export default function Footer({totalTodos}) {
  return (
    <div className='footer-container'>
        <p>Total Todos : {totalTodos.length}</p>
    </div>
  )
}
