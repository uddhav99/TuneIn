# TuneIn
 A web application that uses computer vision to analyze the user’s environment and provides an original playlist of music based on user’s surroundings!

## Local Usage 
The application currently works in development mode by simply booting up a Node.js server. After cloning the repository, follow these steps to get it running yourself -:

Clone the repo and install the dependencies.
```
$ git clone https://github.com/uddhav99/TuneIn.git
$ cd TuneIn
```
```
npm install 
```
Once you install all the dependencies, you will have to do the following steps to Add the API keys 
```
* Go to your favourite code editor (VisualStudio Code, Sublime text etc)
* Create a 'config' folder
* Create a new file called keys.js
* Add the API keys for the following (names mentioned in parenthesis)
  - Spotify Client ID (spotifyClientID)
  - Spotify Secret (spotifySecret)
  - Spotify Redirect (spotifyRedirect: 'http://localhost:8000/auth/spotify/callback') 
  - Microsoft Cognitive Services API (ComputerVision)
  - Microsoft Cognitive Services API Endpoint (ComputerVisionEndpoint)

```
Example structure of keys.js file
```
module.exports = {
    spotifyClientId: '',
    spotifySecret: '', 
    cookieKey: 'jdshafjhadsjfhbadsbfasdbasdasdasdvrehtyuj', 
    spotifyRedirect: 'http://localhost:8000/auth/spotify/callback', 
    ComputerVision: '', 
    ComputerVisionEndpoint: ''
}
```
After all the dependencies are installed and the API keys are added you can start the server
```
$ npm run dev
```
## Production Usage
The app is currently being beta-tested, and will soon be released (hopefully by October!)

## Technologies
- Front-end: React.js, Redux, JavaScript, HTML5/CSS3
- Back-end: Node.js, Express.js, Passport.js, Spotify OAuth, Spotify API, Microsoft Cognitive Services API
