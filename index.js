const colors = require("colors/safe");
//console.log(colors.red("Hello World!"));

let rfirst=+process.argv[2];
let rlast=+process.argv[3];

if(rlast<= rfirst || isNaN(rfirst) || isNaN(rlast)){
  console.log(colors.red("Задайте другой диапазон, в котором аргументы являются числами и второй аргумент больше первого"));
  process.exit(1);
}

var i=rfirst;
simple = [];
var z=0;

while (i <= rlast){   

    if (i <= 3){
        simple[i-1]=i;
        var z=3;
        i++;
        continue;
    }

    var j=1;
    while (j < i){       
            j++;
            if (i % j != 0){       
                if (j == (i / 2).toFixed(0)){                  
                    simple[z] = i;
//                    console.log("Простое число = "+i);
                    z++;
                }
            }
            else{
            break;
            }      
    } 
    i++;    
}

if (simple.length < 1){
    console.log(colors.red("Простых чисел в диапазоне нет"));
}
else{
    console.log("Массив простых чисел в диапазоне " +rfirst, rlast +" следующий " +simple);
} 

let numcolor = 1;
for (let i = 0; i < simple.length; i++){
    switch(numcolor) {
        case 1:
          console.log(colors.green(simple[i]));
          numcolor++;
          break;
        case 2:
          console.log(colors.yellow(simple[i]));
          numcolor++;
          break;
        case 3:
          console.log(colors.red(simple[i]));
          numcolor =1;
          break;        
      }

}

