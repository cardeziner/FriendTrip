import React from 'react'

const DirectionsComponent = props =>{

  const the_button = document.querySelector(".js-btn")
  const modal = document.querySelector(".modal")
  const closeBtn = document.querySelector(".close")

  document.addEventListener("DOMContentLoaded",() => {
    the_button.addEventListener("click", handleClick)
  })

  function handleClick(event) {
    modal.style.display = "block";
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none"
    })
  }

  return(
    <div>
      <div class="app">

        <div class="btn">
        <button class="js-btn">new user?</button>
      </div>

      <div class="modal">
       <div class="modal_content">
        <span class="close">&times;</span>
        <p>I'm A Pop Up!!!</p>
       </div>
      </div>
    </div>
</div>
  )
}

export default DirectionsComponent
