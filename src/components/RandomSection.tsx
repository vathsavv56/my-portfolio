import CurrentlyLearning from "./CurrentlyLearning"
import Hobbies from "./Hobbies"
import Quoute from "./Quoute"


const RandomSection = () => {
  return (
    <div>
      <Hobbies/>
      <CurrentlyLearning/>
      <Quoute quote="Vishvam darpana-drisyamana-nagari-tulyam nijantargatam" character="Adi Sankara"/>
    </div>
  )
}

export default RandomSection