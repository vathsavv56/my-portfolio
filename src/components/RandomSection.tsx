import CurrentlyLearning from "./CurrentlyLearning";
import Hobbies from "./Hobbies";
import Quoute from "./Quoute";

const RandomSection = () => {
  return (
    <div>
      <Hobbies />
      <CurrentlyLearning />
      <div className="px-6 pb-16">
        <Quoute
          quote="Vishvam darpana-drisyamana-nagari-tulyam nijantargatam"
          character="Adi Sankara"
        />
      </div>
    </div>
  );
};

export default RandomSection;
