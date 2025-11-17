
function Hello(props){
    return(
        <h1>Hello!!! {props.title} ~!</h1>
    );
}

const hello = (props) => {
    return(
        <h1>Hello! {props.title} ~! </h1>
    )
}
export default Hello;