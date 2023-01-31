import { useState } from "react";
function Clock(){

  const [time, setTime] = useState(new Date())
  
  setInterval(() => {
    setTime(new Date())
  }, 1000)

  return (
    <span>
      {time.toLocaleTimeString()}
    </span>
  );
}


function Weather() {
  return <div>The Weather</div>
}

export const Widgets = [
  {
    id: "Clock",
    widget: <Clock />
  },
  {
    id: "Weather",
    widget: <Weather></Weather>
  }
]