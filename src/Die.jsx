import DotsRender from "./DotsRender"
export default function Die(props) {

    const styles = {
        backgroundColor: props.isClicked ? "#59E391" : "#FFFFFF"
    }
    return (
        <div className="dice" onClick={props.switchDice} style={styles}>

            {<DotsRender value={props.value}/>}
        </div>
    
    )
    
    
}




