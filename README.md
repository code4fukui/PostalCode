# PostalCode

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This is an ES module that converts Japanese zip codes to addresses, including local government codes and town names.

## Demo
[Convert zip codes to addresses](https://code4fukui.github.io/PostalCode/)

## Features
- Converts Japanese zip codes to local government codes and town names
- Automatically updates daily using GitHub Actions
- Provides API for web and Deno usage

## Usage
Install locally:

```
$ github clone https://github.com/code4fukui/PostalCode.git
```

Usage example:

```js
import { PostalCode } from "https://code4fukui.github.io/PostalCode/PostalCode.js";

console.log(await PostalCode.decode(9160042));
```

Output:
```
[{ zipcode: "9160042", lgcode: "18207", town: "新横江", townyomi: "シンヨコエ" }]
```

## Data
Uses the [KEN_ALL.ZIP](https://www.post.japanpost.jp/zipcode/download.html) data from Japan Post.

## License
MIT License