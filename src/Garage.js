/*
하나의 파일 내에여러가지 컴포넌트 선언 가능.
 */
function Car(props){
    return(
        <h1>I am a {props.brand}</h1>
    );
}

function Car2(props){
    return (
        <h1>I am a {props.brand.name}! ~~ {props.brand.model} </h1>
    );
}
function Car3(props){
    return (
        <h1>I am a {props.brand}! </h1>
    );
}
function Car4(props){
    return <h1>Car no.{props.brand.id} is {props.brand.name}</h1>;
}

function Garage(props){
    let carBrand = "Ford";
    let carInfo = {
        name: "Ford"
        , model: "Mustang"
    }

    let temp_array = [1, 4, 9, 16];
    let temp_array2 = temp_array.map((x) => (x*2));

    let cars = ["ford", "bmw", "audi"];
    let array_car = [
        {id : 1, name: "ford"}
        ,{id : 2, name: "honda"}
        ,{id : 3, name: "audi"}
        ,{id : 4, name: "bmw"}

    ]
    return (
        <div>
        Who lives in my Garage?
        <Car brand = 'Ford'/>
        <Car brand = {carBrand}/>
        <Car2 brand = {carInfo}/>

        {cars.map((x) => <Car3 brand ={x}/>)}
        {array_car.map((x) => <Car4 key = {x.id} brand = {x}/>)}
        </div>
    );
}

export default Garage;