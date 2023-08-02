import './App.css'
import RadarChart from './components/Charts/RadarChart'
import { AxisUncalculated } from './components/Charts/RadarChartLayout';

const axes: AxisUncalculated[] = [
  {label: "a", ticks: [{label: "a"},{label: "a"},{label: "a"},{label: "a"},{label: "a"}]},
  {label: "a", ticks: [{label: "a"},{label: "a"},{label: "a"},{label: "a"},{label: "a"}]},
  {label: "a", ticks: [{label: "a"},{label: "a"},{label: "a"},{label: "a"},{label: "a"}]},
  {label: "a", ticks: [{label: "a"},{label: "a"},{label: "a"},{label: "a"},{label: "a"}]},
  {label: "a", ticks: [{label: "a"},{label: "a"},{label: "a"},{label: "a"},{label: "a"}]},
  {label: "a", ticks: [{label: "a"},{label: "a"},{label: "a"},{label: "a"},{label: "a"}]}
]

function App() {
  return (
    <>
      <RadarChart axes={axes}/>
    </>
  )
}

export default App
