# HTTP test for CORS

## What is CORS?
CORS is short for "Cross-Origin Resource Sharing". This mechanism is restricterd by browser for security concern. But there are scenarios that CORS is necessary.
A normal example is when the front-end server and back-end server is separated and front-end needs to retrieve data from back-end.

## File Structure:
- server-front.js is a simulation for front-end server.
- server-back.js is a simulation for back-end server.
- test.html is a simple html file for front-end server to response. It will make an AJAX request to the backend server.

## Test Coverage
- Default behavior of CORS.
  - Comment out `response.writeHead` method in server-back.js
  - Start front and back server.
  - Visit front-end in browser and check console.
    - Get Error: </br>```Access to XMLHttpRequest at 'http://localhost:8887/' from origin 'http://localhost:8888' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.```
  - Check 'Network' tab
    - Found a request to backend server with headers:</br>```Host: localhost:8887 Origin: http://localhost:8888```

- Exception
  - script/img tag
    - add `<script src="http://localhost:8887/"></script>` in test.html and visit front-end server again.
      - Browser will allow CORS through specific tags, `<script>`, `<img>`, `<link>`
      - Json-P use this mechanism

- CORS Header Solution
  - Add `response.writeHead` method in server-back.js. Set response-header`Access-Control-Allow-Origin` to `*`
    - `"Access-Control-Allow-Origin": "*"` will allow CORS from any origin
    - change '*' to front-end's domain name to ensure security.
  - Problems:
    - Only GET HEAD POST are allowed.
    - Only specific Content-Type are allowed.
    - ONly specific request-header are allowed.
    - Check <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS'>MDN</a> for more restriction.
  - change method and add self-defined request-header `X-Test-Cors` in the fetch method.
    - Get error:</br>`Access to fetch at 'http://localhost:8887/' from origin 'http://localhost:8888' has been blocked by CORS policy: Request header field x-test-cors is not allowed by Access-Control-Allow-Headers in preflight response`
  - Set response-header `Access-Control-Allow-Headers` to `X-Test-Cors` to allow self-defined header.
    - Can get response normally
    - In 'network' tab, you can find an additional request of which method is OPTION
  - Set response-header `Access-Control-Allow-Methdos` to allow additional methods.

- Preflighted requests
  - Browser will automatically initiate a preflighted request to get allowed method and headers.
    - Preflighted request header: `method: OPTION`
  - `Access-Control-Allow-Max-Age`
    - Set this header in response to instruct the browser that for how long the preflighted request it send out is valid.