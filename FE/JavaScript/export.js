//내보낼 데이터 만들기
const foo = Math.PI * Math.SQRT2;

function cube(x) {
    return x * x * x;
}

var graph = {
    options:{
        color:"white",
        thickness:"2px"
    },
    draw:function(){
        console.log("Draw Function");
    }
}

export {foo, graph, cube};