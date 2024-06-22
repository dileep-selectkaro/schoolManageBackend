//sort

// const arr=[3,4,5,2,1,34,5,2];

// const newArr=arr.sort((a,b)=>{
//     return a-b
// })
// console.log(newArr)

//========bubble sort using function========
// function abc(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j <arr.length- i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j + 1];
//                 arr[j + 1] = arr[j];
//                 arr[j] = temp;
//             }
//         }
//     }
//     return arr;
// }

// console.log(abc([3, 4, 5, 2, 1, 34, 5, 2]));



//using veraible 
// const arr=[3,4,1,2,1,4,6,7];
// const n=arr.length;
// //console.log("length:",n);
// for(let i=0;i<n;i++){
//     for(let j=0;j<n-i-1;j++){
//         if(arr[j]>arr[j+1]){
//             let temp=arr[j+1];
//             arr[j+1]=arr[j];
//             arr[j]=temp
//         }
//     }
// }
// console.log(arr)

// ===fact
// function fact(num){
//     if(num===1 ||num=== 0)return 1
//     else{
//         return num*fact(num-1);
//     }

// }
// console.log(fact(4))

//==prime=
// function isPrime(n){
//     if(n<2) return false
//      for(let i=2;i<=Math.sqrt(n);i++){
//         if(n%i===0)return false
    
//      }
//      return true
// }

// function range(start,end){
//     for(let i=start;i<=end;i++){
//         if(isPrime(i)){
//              console.log("prime number:",i)
//         }
//         else{
//             console.log("Non prime:",i)
//         }
//     }
// }
//   range(1,20)


//==reverse str

// let str="Dileep kumar";
// const newStr=str.split("").reverse().join(""); 
// console.log(newStr)

//=== reverse num===
//=== reverse num===
// function rev(arr) {
//     return arr.slice().reverse(); // create a copy of the array, then reverse it
// }
// console.log(rev([3, 4, 2, 1])); 

//==============without built in method====

// const str = "Dileep kumar";
// const n=str.length;
// let reverseStr = "";
// for(let i = n-1;i>=0 ; i--){
//     reverseStr = reverseStr +str[i];
// }
// console.log(reverseStr);



//palindrome

// function pali(str1,str2){
//     // console.log("str1",str1);
//     // console.log("str2",str2);
//     let newStr1=str1.toLowerCase();
//     // console.log("newStr1",newStr1);
//     let newStr2=str2.toLowerCase();
//     // console.log("newStr2",newStr2)
//     if(newStr1===newStr2){
//         console.log("pali");
//     }else{
//         console.log("not ")
//     }

// }
// pali("Java","java");

// const arr=[1,2,3,4,5];
// console.log(arr.length);

// const str="Java math";
// console.log(str.length);

// const arr=[2,3,4,5,6,6];
//indexOf:  returns the index of the first occurrence of a specified substring within the string,
// let newArr=arr.indexOf(6);
// console.log(newArr)

//lastIndexOf:  returns the index of the last occurrence of the specified substring.


// let lastIndex=arr.lastIndexOf(6)
// console.log(lastIndex);

// const str="apple,banana,orange";
// const arr=str.split(",");
// console.log(arr)

// const person={
//     name:"Dileep",
//     age:25,
//     city:"jsr"
// }
// // console.log(person)
// // person.age=55
// // console.log(person.age)

// //loop through

// for(let abc in person){
//     console.log(abc,": ",person[abc]);
// }


// iterate over element in an array

//const arr=[1,2,3,4,5,6,7]

//using for loop
// for(let i=0;i<arr.length;i++){
//     console.log(i)
// }

//==using for each loop
// arr.forEach((a)=>{
//     console.log(a)
// })


//====using for of loop

// for(const a of arr){
//     console.log(a)
// }

//=======check  if an array contains a specific element 
// const arr=[1,2,3,4,5];
// //console.log(arr.includes(15)); //false
// console.log(arr.indexOf(14));


//merge two array
// const arr1=[1,2,3,4,5];
// const arr2=[5,767,89,5];
// // const merge=[...arr1,...arr2];
// const merge=arr1.concat(arr2);
// console.log(merge)

//check if a string contains a substring
// const str="dileep ,kumar";
// console.log(str.includes("dileep")); //true
// console.log(str.indexOf("kumar")!==-1)//true
// console.log(/kumar/.test(str));//true

// replace substring in a string
// let str="dileep,kumar";
// const newStr=str.replace("dileep","Jay")
// console.log(newStr)

//check if an object has a specific property 
// const person={
//     name:"Dileep",
//     age:25
// }
// // console.log(person.hasOwnProperty("age"));//true
// console.log("age" in person); //true

//==clone an object 
// const obj={name:"Dileep",age:25};
// const clone1={...obj};
// // console.log(clone1);
// const clone2=Object.assign({},obj);
// console.log(clone2);

// const clone3=JSON.parse(JSON.stringify(obj));
// console.log(clone3);


//==remove a property from an object

// const person={name:"Dileep",age:25};
// delete person.age;
// console.log(person)


//=====sort an array of numbers or string
// const num=[2,3,4,44,2,13,4,5];
// num.sort((a,b)=>a-b);
// console.log(num);

// const strings=["banana","apple","cherry"];
// strings.sort();
// console.log(strings);

// find max and min num

// const arr=[3,4,5,6,3,6,34,36];
// const max=Math.max(...arr);
// const min=Math.min(...arr)
// console.log(max,min);


//count the occurrences of a substring in a string

// function countOccurence(str,sub){
//     const regex=new RegExp(sub,"g");
//     const matches=str.match(regex)||[];
//     return matches.length;
// }
// console.log(countOccurence("dilleep kumar","j"));


//count the occurrences of a array of element==

//=======reverse words in a sentence===========
// function reverseWord(sentence){
//     return sentence.split(" ").reverse().join(" ");
// }
// console.log(reverseWord("dileep kumar jsr"))


//merge two object

// const obj1={a:1,b:2};
// const obj2={b:3,c:4};
// const merged={...obj1,...obj2};
// console.log(merged);

// check if two objects are equal
// const obj1={a:1,b:{c:2}};
// const obj2={a:1,b:{c:2}};
// const equal=JSON.stringify(obj1)===JSON.stringify(obj2);
// console.log(equal);

//remove dublicate array element

// const arr=[2,3,42,4,5,3,2,1,2,4];
// const newArr=[...new Set(arr)];
// console.log(newArr);

//capitalize the first letter of each word in a sentence
// function capitalize(sentence){
//     return sentence.split(" ").map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(" ");
// }

// console.log(capitalize("dileep kumar jsr"))

// function firstLetterCapi(sentence){
//  return sentence.split(" ").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ")
// }
// console.log(firstLetterCapi("dileep kumar str"));

//convert an array of objects to an object with key-value pairs
// const array=[{key1:"value"},{key:"value2"},{key3:"value3"}];
// const object=array.reduce((acc,obj)=>{
//     const key=Object.keys(obj)[0];
//     acc[key]=obj[key];
//     return acc;
// },{});
// console.log(object);


// setTimeout(()=>{
//     console.log("Delay execution after some second");
// },1000)

// const timeout=setTimeout(()=>{
//     console.log("this will not be executed");
// },1000);
// clearTimeout(timeout)

// const interval=setInterval(()=>{
//     console.log("Repeated execution every second");
// },1000)


// setImmediate(()=>{
//     console.log("Executed async")
// });

// var count =1;
// setTimeout(()=>{
//     console.log(count);
// },1000)

// let count=0;
// var intervalId=setInterval(()=>{
//     console.log(count)
//     count++;
//     if(count===5){
//         clearInterval(intervalId)
//     }
// },1000)

// for(let i=0;i<5;i++){
//     setTimeout(()=>{
//         console.log(i);
//     },1000*i)
// }

// var counter=0;
// function increment(){
//     console.log(counter);
//     counter++;
// }
// var intervalId=setInterval(increment,1000);

//find the second largest number
// function secondLargest(arr){
//     arr.sort((a,b)=>b-a);
//     return arr[1];
// }
// console.log(secondLargest([2,3,344,5,6,34,23,331]));

//remove falsy values 
// function removeFalsy(arr){
//     return arr.filter(Boolean);
// }
// console.log(removeFalsy([0,1,false,true,"","hello",null,undefined,NaN]))


//anagram string

// function anagram(str1,str2){
//     return str1.split("").sort().join("")==str2.split("").sort().join("");

// }
// console.log(anagram("dileep","eeplid"))

//count the occurrences of each element in an array and store them in object
// function countOccurence(arr){
//     return arr.reduce((a,c)=>{
//         a[c]=(a[c]||0)+1;
//         return a
//     },{});
// }
// console.log(countOccurence([2,3,4,5,3,2,3,4,5,3,2,1]))
// function countOccurence(arr){
//     let countObj = arr.reduce((a,c)=>{
//         a[c]=(a[c]||0)+1;
//         return a;
//     },{});
    
//     let maxCount = Math.max(...Object.values(countObj));
//     let maxElements = Object.keys(countObj).filter(key => countObj[key] === maxCount).map(Number);
    
//     return { counts: countObj, maxElements: maxElements };
// }

// console.log(countOccurence([3,2,3,4,5,3,2]));

// function countOccurence(arr){
//     let countObj=arr.reduce((a,c)=>{
//         a[c]=(a[c]||0)+1;
//         return a
//     },{});
//     let maxCount=Math.max(...Object.values(countObj));
//     let maxElements=Object.keys(countObj).filter(key=>countObj[key]===maxCount).map(Number);
//     return {counts:countObj,maxElement:maxElements};
// }
// console.log(countOccurence([3,4,4,3,4,4,4,32,3,33,2]))

//clouser:A clouser is an inner function that has access to the outer function variable.


// function outerFunction(){
//     let a=10;
//     function innerFunction(){
//         console.log(a)
//     }
//     return innerFunction
// }
// const result=outerFunction()
// result()


// function outerFunction(){
//     const x=10;
//     function innerFunction(){
//         console.log(x)
//     }
//     innerFunction()
// }
// outerFunction()

//callback:A callback is a function passed as an argument to another function.

// function greet(callback){
//     let x=10;
//     callback(x)
   
// }
// function say(x){
//     console.log(x);
// }

// greet(say);

//event loop:It is a mechanism  that allows javascript to handle multiple asynchronous tasks and events in a non blocking manner , ensuring smooth execution and responsiveness in web application
//call stack  event queue

//The event loop continuously checks two main source  : call stack and event queue
//If the call stack is empty and there are tasks in the events queue, the event loop takes the first event from the queue and pushes it onto the call stack for execution.
//once the call stack is empty  again , the event loop repeats this , taking events from the queue  and pushing them onto the call stack untill the queue is empty.

//===ES6 feature
//classes  arrow function ,variable(let, const), destructuring, modules, ternary operator, spread operator
//useEffect:It is a hook provided by react that allows you to perform side effects in function components
//side effects can include things like data fetching , dom manipulation or subscriptions.

//map():map() method is used to iterate over an array and transform each  element in the array according to a provided callback. map()method is to apply a transformation or mapping function to each element of the array and produce a new array of the same length with the transformed values.

// const arr=[2,3,4,5];
// const newArr=arr.map((a)=>a+1)
// console.log(newArr);


//promises:promises use a chaining syntax with .then() and .catch() method to handle asynchronous operation
//promises handle error using .catch() method.
//It is provide a clear and explicit way to handle asynchronous  code.

// const promise=new Promise((response,reject)=>{
//     setTimeout(()=>{
//      const success=false
//      if(success){
//         response("Succesfully")
//      }else{
//         reject("Error")
//      }
//     },1000)
// })
// promise
// .then((result)=>{
//    console.log("Success:",result)
// })
// .catch((error)=>{
//     console.log("Error hai:",error)
// })

//try catch

// try
// {
//     const a=10;
//     const b=2;
//     console.log(a/b)
// }
// catch(error){
//   console.log("Error:",error)
// }


//===async/await==========
//async/await provide a more synchronous looking syntax for writting asynchronous code.
//async is a keyword to defined asynchronous function.

//await: It is a keyword to pause execution untill a promise is settled.
//async/await:  handle error using try/catch block.

//Higher order function
//Higher order functions are functions that can accept  other functions as arguments or return function as output.

//app.use(express.json())
//It is a built in middleware function use to  parse incoming  request bodies with json payload. 
//This middleware parses the json data. 

//function and types
// named function, anonymous function, function expression, arrow function, IIFE, callback function , higher order function
//when to use callback function in real app
// iteration, event handling, asynchronous operation, higher order function, promises 

//middleware:middleware is the function that works b/w the request and the response cycle.
//middleware gets executed after the server receives the request and before the controller sends the response.

//I/O  operations
//const fs=require("fs");
//write file
//  const filePath="abc.text";
// const fileContent="ssdfgdsfg dfgsdfdf fdfsjksdf";

// try {
//     fs.writeFileSync(filePath,fileContent)
//     console.log("Successfully created")
// } catch (error) {
//     console.log("Error:",error)
// }

// try {
//     const result=fs.readFileSync("abc.text","utf-8")
//     console.log("successfully",result)
// } catch (error) {
//     console.log("error:",error)
// }



//=======Hooks=======
//useState():- Allows functional components to add state variables

//useEffect():- Enable performing side effects in functional components, such as data fetching ,dom manipulation.

//useContext():- Provides access to react context.

//useMemo():- Returns a memoized value.

//useCallback():- Memoizes a callback function

//useRef():- It can be used to access a Dom element directly


//===closure====
//A closure is an inner function that has access to the outer function variable.

// example====

// function outerFunction(){
//     let outerVariable="Dileep";

//     function innerFunction(){
//         console.log(outerVariable);
//     }
//     return innerFunction();
// }
// outerFunction()


//======another example=====
// function outerFunction(){
//     let x=5;
//     let y=5
//     let z=x+y;

//     function innerFunction(){
//         console.log(z);
//     }
//     return innerFunction()
// }
// outerFunction()


//===callback()==
//callback is a function passed as a argument to another function.

//example

// function abc(x,y,call){
//     let sum=x+y
//     call(sum)

// }

// function xyz(sum){
//     console.log("sum:",sum);
// }

// abc(10,2,xyz);



//=== event loop  ===

//It is a mechanism that allows js to handle multiple asynchronous tasks and events in a non blocking manner.
//The event loop continuously checks two main source  the call stack and the event queue 
//stages:   call stack   and event queue
//if the call stack is empty and there are tasks in the event queue, the event loop takes the first event from the queue and pushes it into the call stack for execution.once the call stack is empty again , the event loop repeats this , taking events from the queue and pushing them onto the call stack until the queue is empty.


//====React ES6 features======
//classes  arrow function variable(let,const) , destructuring, modules, ternary operator, spread operator.


//map(): map() method is used to iterate over an array and transform each element in the array according to provided callback function.

//map() method is to apply a transformation or mapping function to each element of the array and produce a new array of the same length with the transformed values.

//=====promises()====
//promises use a chaining syntax with .then() and .catch() method to handle asynchronous operation.
//promises handle error using .catch() method.
//it is provide a clear and explicit way to handle asynchronous code.


//===async/await=======

//async/await provides a more synchronous looking syntax for writing asynchronous code.
//async: It is a keyword to define asynchronous function.
//await:It is keyword to pause execution until a promise is settled.
//async/await handle error using try/catch block.


//=====Higher order function====
//Higher order functions are functions that can  accept other functions as arguments or return functions as output.

//app.use(express.json())====
//It is middleware parses the json data.

//=========When to use callback function in real app======
//iteration , event handling , asynchronous operation , higher order function , promise


//==========middleware============
//middleware is the function that works b/w the request and the response cycle.
//middleware  gets executed  after the server receives the request and before the controller sends the response.

// console.log("first");

// const abc = setTimeout(() => {
//     console.log("second");

//     process.nextTick(() => {
//         console.log("third");
//     });
// }, 0);























































