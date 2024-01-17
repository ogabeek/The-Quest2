// Display the position of the cursor (coordinates X and Y), on the page. It should constantly update everytime we move the mouse.
cursorCoordinates = () => {
    document.addEventListener('mousemove', e => {
    const xValue = document.getElementById('xValue').textContent= e.x; 
    const yValue = document.getElementById('yValue').textContent= e.y; 
     
   });
   }
   cursorCoordinates ();


// let screenLog = document.querySelector("#screen-log");
// document.addEventListener("mousemove", logKey);

// function logKey(e) {
//   screenLog.innerText = `
//     Screen X/Y: ${e.screenX}, ${e.screenY}
//     Client X/Y: ${e.clientX}, ${e.clientY}`;
// }


// class Application extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { x: 0, y: 0 };
//     }
//     _onMouseMove(e) {
//       this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
//     }
//     render() {
//       const { x, y } = this.state;
//       return <div className="container">
//         <div>
//           <img onMouseMove={this._onMouseMove.bind(this)} width="100" height="150" src="../img/world_map.jpg" />
//         </div>
//         <h1>{ x } { y }</h1><br/>
//       </div>;
//     }
//   }
  
//   /*
//    * Render the above component into the div#app
//    */
//   React.render(<Application />, document.getElementById('app'));
  

// const box = document.querySelector(".box");
// const pageX = document.getElementById("x");
// const pageY = document.getElementById("y");

// function updateDisplay(event) {
//   pageX.innerText = event.screenX;
//   pageY.innerText = event.screenY;
// }

// box.addEventListener("mousemove", updateDisplay, false);
// box.addEventListener("mouseenter", updateDisplay, false);
// box.addEventListener("mouseleave", updateDisplay, false);