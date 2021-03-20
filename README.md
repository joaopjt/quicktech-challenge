# Pokemon API
Single page application made with react, redux and react-router featuring a pokemon open api.
​
## Quick Start ##
The development enviroment used to be made with react-scripts as a peer dependency. I've changed to a cleary written webpack scss/sass compiling enviroment. React-scripts give us a poor documentation about export the css for use, so i jumped the need to read the webpack config from the project at github.
​
To run the project, first run in your terminal:

```console
npm install
```

and then

```console
npm run start
```

It is about to open a window of your browser in the **PORT=9000**
(Its pretty odd, but is good to verify if the same is not in use).

## The Application ##
It's being able to the user use a filtering over the loaded store.
The redux store is being synchronized with the localStorage, making
the content load happens only at the first time.

It is also using Asynchronous methods, for content loading.

## About the API ##
The **API** is in this address: https://pokeapi.co/

It was poorly made, i've tried to search some graphql ready project
to work on, but it wasn't formatted.

In the code, you will see in the models the object modeling being made
using its structure and by filtering data for our case of use.

## Final Considerations ##
The Start and End is a bad approach for a user that wants to see
all the content without additional steps. It is really bad for UX.