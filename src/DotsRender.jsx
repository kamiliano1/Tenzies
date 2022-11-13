import { nanoid } from "nanoid"
import { dotsStyles } from "./dotsStyle"

export default function dotsRender(props) {
    return dotsStyles[props.value-1].map(dotsStyle=>{
        return <div className="dots" key={nanoid()} style={dotsStyle}></div>
    })
}