"use strict";

  //Promisify 

    function promisify(original) {
      if (typeof original !== "function") {
        throw new TypeError("Argument to promisify must be a function");
      }

      return function (...args) {
        const that = this;
        return new Promise((resolve, reject) => {
          args.push(function callback(...values) {
            if ( values.length === 1 ) {
              return resolve(values[0]);
            } 
            return resolve(values);
          });

          try {
            original.call(that, ...args);
          } catch(e) {
            reject(e);
          }
        });
      };
    }

  // Export the public API
    export {promisify};


