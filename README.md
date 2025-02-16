# All-Simulator
A web-based tool for simulating phenomena in physical, mathematical, and other domains.


## Deployment
### Start from Source Code
1. download the repository
2. change directory
```
cd /path/All-Simulator
```
3. install dependencies
```   
npm install
```
4. run the server
```
npm run serve
```
5. Open your browser and navigate to `http://localhost:8080`
### Start from Dist Directory
1. download the repository
2. change directory
```
cd /path/All-Simulator/dist
```
3. serve the files  
you need a simple HTTP server to serve the files. Here sre some examples:  
If you have Node.js installed, you can use the `http-server` package to quickly serve the files.
```bash
npx http-server dist -p 8080
```
If Python is installed on your machine, you can use its built-in HTTP server.

```bash
# For Python 2.x:
python -m SimpleHTTPServer 8080
```

```bash
# For Python 3.x:
python -m http.server 8080
```
if you are a windows user, copy the http_server.exe in this repo to dist and run it.  
4. Open your browser and navigate to `http://localhost:8080`

## To-do List
1. add more simulators
2. bilingual support
3. search bar
