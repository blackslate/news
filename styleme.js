
export function changeColor(element) {
    // Select the h1 element by its ID
    const heading = document.querySelector('#dynamic-heading');
    const button = document.querySelector('#sButton');
    const h2 = document.querySelector('#dynamic-h2');
    const h2a = document.querySelector('#dynamic-h2-a');
   
   
    // console.log(saveButton1);
    
    // Generate a random color
    const randomColor = getRandomColor();
  // console.log(randomColor);
  const saveButton1 = document.querySelectorAll('.article button').forEach (item =>
    item.style.backgroundColor = randomColor)
    // Apply the random color as the background color
    heading.style.backgroundColor = randomColor;
    button.style.backgroundColor = randomColor;
    h2.style.backgroundColor = randomColor;
    h2a.style.backgroundColor = randomColor;
    // saveButton1.style.backgroundColor = randomColor;

  }
  
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
  
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
  
    return color;
  }
  // changeColor()
  