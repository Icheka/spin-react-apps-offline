# spin-react-apps-offline
<b>`Spin-React-Apps-Offline`</b> is a very light, very fast, offline project installer for React. 

It installs your `node_modules` packages and other necessary files for you without a connection to the Internet. It's also much faster than the traditional `create-react-app`. <h3>spin-react-apps-offline</h3> provides several templates for you to choose from. 

You can install a `barebones` React application, or install one with built-in `TypeScript` support, or one with `pre-configured routes` like Home and Authentication + <b>React-Redux, Redux, React-Router-DOM, built-in Firebase configuration,</b> etc.

## SPIN REACT APPS OFFLINE
<div align="center">
  <h3>Free, offline installer for React applications.</h3>
</div>
<br />
<div align="center" border="2">
  # How To Use
  <div align="left">
    ## Installation
    Install the latest version of `spin-react-apps-offline` by following these steps:
    <b>Note:</b>Steps 1 to 4 deal with installing and confirming the Node runtime and Node Package Manager (NPM). Feel free to skip these steps if you already have both Node.js and NPM installed and up-to-date.
    
    1. <h3>Install the Node runtime:</h3> Head to [https://nodejs.org/en/download/](https://nodejs.org/en/download/) and install the latest Long Term Support (LTS) version for your particular computer system. If you need help, a quick web search for 'how to install Node.js on (your computer's name and operating system here)' will point you in the right direction.
    2. <h3>The Node Package Manager (NPM)</h3> is automatically installed with Node.js.
    3. After the Node.js installer installs the necessary software, confirm that Node and NPM are correctly installed and working by starting a terminal application and entering 
    
    ```bash
    node --version && npm --version
    ```
    
    5. Typically, you should see two lines of version numbers. The first tells the version of Node.js you have installed. The second tells the version of NPM you have installed. If you get an error at this point, you might need to try reinstalling Node.js.
    6. <h3>Install Spin React Apps Offline:</h3> When Node and NPM have been installed, you can proceed to install <b>Spin React Apps Offline</b> by entering the following command:
     
    ```bash
    npm install spin-react-apps-offline --global --verbose
    ```
    
    This command can be reduced to
    
    ```bash
    npm i spin-react-apps-offline -g
    ```
    
    These commands install Spin React Apps Offline 'globally'. This means that Spin React Apps Offline will be accessible from any folder in your computer system, not just the folder where these commands were run. This is the recommended way to use Spin React Apps Offline.
    
    Conversely, you can install Spin React Apps Offline in a folder alone. It won't be accessible outside this folder:
    
    ```bash
    npm i spin-react-apps-offline
    ```
     
  </div>
  <div border="2" align="left">
  ## Usage
  Using Spin Reacts Apps Offline is a very simple and straightforward process.
  Spin Reacts Apps Offline provides the ability to install templates: pre-configured modules, code and directory structure for a wide variety of React apps.
  More templates are being added to Spin Reacts Apps Offline, but at this time the following templates are available:
  (Note: You can spin a new React application just by entering `spin_react your_project_name`. This will default to the `barebones` template and Spin Reacts Apps Offline will handle thhe installation for you.)
  
  <table>
    <thead>
       <tr>
         <td>SN</td> <td>Template</td> <td>Description</td> <td>Usage</td>
       </tr>
    </thead>
    <tbody>
       <tr>
         <td>1</td> <td> Barebones</td> <td>A blank React application with minimal configuration, similar to what you'd get running `npx create-react-app`. Great for everybody and every kind of project.</td> <td>spin_react my_new_project_name -b</td>
       </tr>
    </tbody>
  </table>
  </div>
</div>
