const bar = ( ) => console.log('bar');
const baz = ( ) => console.log('baz');
const foo = ( ) => {
  console.log('foo');
    setTimeout(bar, 0);
    new Promise((resolve, reject) => 
        resolve('should be right after the baz, before bar')
    ).then((res) => console.log(res));
    baz();
}

foo();