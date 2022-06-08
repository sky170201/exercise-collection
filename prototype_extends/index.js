// 1、原型链继承：原型继承，且方法共享会被篡改
;(() => {
    function SuperType () {
        this.colors = ['red', 'blue', 'green']
    }
    SuperType.prototype.Fun = () => {}
    function SubType () {}
    
    // 继承了SuperType
    SubType.prototype = new SuperType()
    let instance1 = new SubType()
    instance1.colors.push('black')
    console.log(instance1.colors)
    let instance2 = new SubType()
    console.log(instance2.colors)
})()
// 缺点：SuperType的属性变成了SubType的prototype的公用属性，后面的实例会共享这个属性且不能传参


///2、借用构造函数: 在构造函数内部调用超类构造函数，只能继承实例属性，不能继承原型
;(() => {
    // function SuperType () {
    //     this.colors = ['red', 'blue', 'green']
    // }
    // function SubType () {
    //     // 继承了SuperType
    //     SuperType.call(this)
    // }
    // let instance1 = new SubType()
    // instance1.colors.push('black')
    // console.log(instance1.colors)
    // let instance2 = new SubType()
    // console.log(instance2.colors)

    function SuperType(name){
        this.name = name;
    }
    SuperType.prototype.test = () => {
        console.log('test')
    }
    function SubType(){
        //继承了SuperType，同时还传递了参数
        SuperType.call(this, "Nicholas");
        //实例属性
        this.age = 29;
    }
    let instance = new SubType();
    console.log(instance.name)
    console.log(instance.age)
    // instance.test() // error

    // 原理：在子类型构造函数的内部调用超类型构造函数
    // 优点：解决了superType中的私有属性变公有的问题，可以传递参数
    // 缺点：方法在函数中定义，无法得到复用
})()

// 3、组合继承
;(() => {
    function SuperType(name){
        this.name = name;
        this.colors = ["red", "blue", "green"];
    }
    SuperType.prototype.sayName = function(){
        console.log(this.name)
    };
    function SubType(name, age){
        SuperType.call(this, name);//借用构造函数继承属性，二次调用
        this.age = age;
    }
    SubType.prototype = new SuperType();//借用原型链继承方法，一次调用
    SubType.prototype.constructor = SubType;
    SubType.prototype.sayAge = function(){
        console.log(this.age);
    };

    let instance1 = new SubType('abc', 6)
    instance1.colors.push('bbb')
    console.log(instance1.colors)
    instance1.sayName()
    instance1.sayAge()
    let instance2 = new SubType('tom', 2)
    console.log(instance2.colors)
    instance2.sayName()
    instance2.sayAge()
    
    // 优点：实现了上面两者的优点，原型和实例属性的继承
    // 缺点：需要调用两次构造函数，浪费内存
})()

// 4、原型式继承
;(() => {
    // Object.create(o) 的实现
    function object(o) {
        function F() {}
        F.prototype = o
        return new F()
    }
    let obj = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    }
    let instance1 = object(obj)
    instance1.friends.push('111')
    console.log('instance1.name', instance1.friends)
    let instance2 = object(obj)
    console.log('instance2.name', instance2.friends)
    // 使用场合：没必要构建构造函数，仅仅是想模拟一个对象的时候
})()

// 5、寄生继承
;(() => {
    function object(o) {
        function F() {}
        F.prototype = o
        return new F()
    }
    function createAnother(original){
        var clone = object(original); //通过调用函数创建一个新对象
        clone.sayHi = function(){ //以某种方式来增强这个对象
            console.log("hi", this.name);
        };
        return clone; //返回这个对象
    }
    var person = {
        name: "Nicholas",
        friends: ["Shelby", "Court", "Van"]
    };
    var anotherPerson = createAnother(person);
    anotherPerson.sayHi(); //"hi"

    // 缺点：方法在函数中定义，无法得到复用
})()

// 6、组合寄生继承（最理想）
;(() => {
    function SuperType(name){
        this.name = name;
        this.colors = ["red", "blue", "green"];
    }
    SuperType.prototype.sayName = function(){
        console.log(this.name);
    };
    function SubType(name, age){
        SuperType.call(this, name);
        this.age = age;
    }

    function F () {}
    F.prototype = SuperType.prototype
    SubType.prototype = new F()
    SubType.prototype.constructor = Child

})()