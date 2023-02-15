// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from 'node:stream'

// Readable Streams can read and return data.
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buff = Buffer.from(String(i));

        this.push(buff);
      }
    }, 1000)
  }
}

// Writable Streams do not return data, only process data coming from Readable or Transform streams.
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// Transform Streams can read data and transform it to writable streams.
// Usually is between Readable and WritableStream
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

// Here is the execution of the ReadableStream with a TransformBetween and a WritableStream writing the data on the console. 
new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());