function fetchData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.example.com/data", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };
  xhr.send();
}

// Original Function
// function fetchData() {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", "https://api.example.com/data", true);
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       console.log(xhr.responseText);
//     }
//   };
//   xhr.send();
// }
