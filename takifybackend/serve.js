// function outer() {
//   let count = 0;

//   function inner() {
    
//     let count = 1
//     count++;
    
//     console.log(count);
//   }

//   return inner;
// }

// const counter = outer();

// counter(); // 1
// counter(); // 2
// counter(); // 3




function inner() {
    
    let count = 1
    count++;
    
    console.log(count);
  }

console.log(inner())

