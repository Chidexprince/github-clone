
/* Formats number to show k if thousand, M if million and so on */
function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

function getTimeInHours(dateInput) {
  let d = new Date(dateInput);
  let date = d.getMonth()
  let timeInHours = d.getHours();
  if (timeInHours < 24) {
    return timeInHours;
  }
  
  return date;
}

export {nFormatter, getTimeInHours}