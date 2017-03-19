var funcs = [];
for (let i =0; i<5; i++){
    funcs.push(function () {
        console.log(i)
        }
    )
}
funcs.forEach(function (func) {
    func();
});
