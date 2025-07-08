import { JSX } from "react";

type ImageTypeProps = {
  imageUrl: string;
}

function RandomFox(props : ImageTypeProps): JSX.Element {
  
  return (
    <div className="m-60">
      <img src={props.imageUrl}/>
    </div>
  )
}

export { RandomFox }