# Appwrite Pastebin Clone with React
To use this app, add a .env file with the following variables:
- APPWRITE_KEY
- PASTES_COLLECTION_ID
- PROJECT_ID
- ENDPOINT

You can get the APPWRITE_KEY, ENDPOINT and PROJECT_ID from your Appwrite Dashboard after creating them respectively.
When done, run 
```
cd setup
```
```
yarn
```
```
node appwrite-pastebin.js
```
The last command runs the appwrite-pastebin.js which creates our PASTES collection and spits out its ID, so copy it and insert it into the .env file.

Then run
```
cd ..
```
```
yarn start
```
to start the React App.

## Screenshots
![Screenshot (104)](https://user-images.githubusercontent.com/45892107/139562975-da9117c8-2e95-4768-9489-f665fa7dc2f6.png)
![Screenshot (105)](https://user-images.githubusercontent.com/45892107/139562977-604dddcc-5286-4cc5-8c22-14b52a550874.png)
![Screenshot (106)](https://user-images.githubusercontent.com/45892107/139562978-217e8409-a696-4b1a-a189-3c0f03ebbb54.png)


