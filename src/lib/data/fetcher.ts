
import { writable } from "svelte/store";

const cache = new Map();

export function getData(url, requestOptions, allowCache=true, logResults=false){
    //return at least a single resolving promise
    const store = writable(new Promise(() =>{}))

    //if we've loaded this before, return it instead
    if (allowCache){
        if (cache.has(url)){
            store.set(Promise.resolve(cache.get(url)))
        }
    }

    //background fetch the data and update our store
    const load = async () =>{
        let response = await fetch(url, requestOptions);
        let data = await response.json();

        if (logResults){
            console.log(data)
        }

        if (allowCache){
            cache.set(url, data);
        }
        
        store.set(Promise.resolve(data));
    }

    load()
    return store;
}

export function fetchAll(urls:string[]) {
    return Promise.all(
      urls.map(url => fetch(url)
        .then(r => r.json())
        .then(data => ({ data, url }))
        .catch(error => (console.log({ error, url })))
      )
    )
  }