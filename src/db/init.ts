import Staff from './models/task4';

async function init(){
    const isDev = true;

  
    await Staff.sync({alter:isDev})
    
}
const dbInit =() => {
    init();
}

export default dbInit;