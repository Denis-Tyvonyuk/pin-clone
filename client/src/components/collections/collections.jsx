import "./collections.css";
import Image from "../Image/image";

const Collections = () => {
  return (
    <div className="collections">
      {/* {Collection} */}
      <div className="collection">
        <Image path={"/pins/pin1.jpeg"} alt={""} />
        <div className="collectionInfo">
          <h1>Minimalist Bed</h1>
          <span>12 pins : 1w</span>
        </div>
      </div>

      {/* {Collection} */}
      <div className="collection">
        <Image path={"/pins/pin1.jpeg"} alt={""} />
        <div className="collectionInfo">
          <h1>Minimalist Bed</h1>
          <span>12 pins : 1w</span>
        </div>
      </div>

      {/* {Collection} */}
      <div className="collection">
        <Image path={"/pins/pin1.jpeg"} alt={""} />
        <div className="collectionInfo">
          <h1>Minimalist Bed</h1>
          <span>12 pins : 1w</span>
        </div>
      </div>

      {/* {Collection} */}
      <div className="collection">
        <Image path={"/pins/pin1.jpeg"} alt={""} />
        <div className="collectionInfo">
          <h1>Minimalist Bed</h1>
          <span>12 pins : 1w</span>
        </div>
      </div>
    </div>
  );
};

export default Collections;
